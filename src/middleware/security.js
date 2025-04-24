import { securityConfig } from '../config/security';

export const applySecurityHeaders = (req, res, next) => {
  // Apply security headers
  Object.entries(securityConfig.headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
};

export const rateLimiter = (req, res, next) => {
  const { windowMs, max } = securityConfig.rateLimit;
  const ip = req.ip;
  const now = Date.now();
  
  // Initialize rate limit tracking if not exists
  if (!req.app.locals.rateLimit) {
    req.app.locals.rateLimit = new Map();
  }

  const userRateLimit = req.app.locals.rateLimit.get(ip) || {
    count: 0,
    resetTime: now + windowMs
  };

  // Reset if window has passed
  if (now > userRateLimit.resetTime) {
    userRateLimit.count = 0;
    userRateLimit.resetTime = now + windowMs;
  }

  // Check if limit exceeded
  if (userRateLimit.count >= max) {
    return res.status(429).json({
      error: 'Too many requests',
      message: securityConfig.errorHandling.customErrorMessages.rateLimit,
      retryAfter: Math.ceil((userRateLimit.resetTime - now) / 1000)
    });
  }

  // Increment count
  userRateLimit.count++;
  req.app.locals.rateLimit.set(ip, userRateLimit);

  // Add rate limit headers
  res.setHeader('X-RateLimit-Limit', max);
  res.setHeader('X-RateLimit-Remaining', max - userRateLimit.count);
  res.setHeader('X-RateLimit-Reset', userRateLimit.resetTime);

  next();
};

export const errorHandler = (err, req, res, next) => {
  const { logErrors, showStackTrace, customErrorMessages } = securityConfig.errorHandling;

  // Log error if enabled
  if (logErrors) {
    console.error(err);
  }

  // Determine error message
  let message = customErrorMessages.apiError;
  if (err.response) {
    switch (err.response.status) {
      case 429:
        message = customErrorMessages.rateLimit;
        break;
      case 400:
        message = customErrorMessages.invalidInput;
        break;
      default:
        message = err.message || customErrorMessages.apiError;
    }
  } else if (err.request) {
    message = customErrorMessages.networkError;
  }

  // Send error response
  res.status(err.status || 500).json({
    error: true,
    message,
    ...(showStackTrace && { stack: err.stack })
  });
};

export const sanitizeInput = (req, res, next) => {
  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = req.query[key].replace(/[<>]/g, '');
      }
    });
  }

  // Sanitize body parameters
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/[<>]/g, '');
      }
    });
  }

  next();
}; 