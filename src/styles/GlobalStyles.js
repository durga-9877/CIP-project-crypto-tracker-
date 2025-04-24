import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Modern CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Custom Properties */
  :root {
    --primary-color: #2196F3;
    --secondary-color: #4CAF50;
    --background-dark: #121212;
    --background-light: rgba(255, 255, 255, 0.1);
    --text-primary: #FFFFFF;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --font-main: 'Montserrat', sans-serif;
    --background-color: #f5f5f5;
    --text-color: #333;
    --card-background: #fff;
    --border-radius: 8px;
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
    --primary: #00ff88;
    --secondary: #00b8ff;
    --accent: #ff00ff;
    --background: #0a0a0a;
    --text: #ffffff;
    --card-bg: rgba(255, 255, 255, 0.03);
    --border: rgba(255, 255, 255, 0.1);
    --error: #ff4444;
    --success: #00ff88;
    --warning: #ffbb33;
    --shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --crypto-pattern: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  /* Base Styles */
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background: #0a0a0a;
    color: #fff;
    line-height: 1.5;
    font-size: 1.6rem;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 10% 20%, rgba(33, 150, 243, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
        linear-gradient(180deg, var(--background-dark) 0%, #1a1a1a 100%);
      z-index: -1;
    }

    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      z-index: -1;
      opacity: 0.5;
      animation: backgroundMove 60s linear infinite;
    }
  }

  @keyframes backgroundMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(60px, 60px);
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-main);
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h1 {
    font-size: 3.2rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
    }
  }

  h2 {
    font-size: 2.4rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 { font-size: 1.8rem; }
  h5 { font-size: 1.6rem; }
  h6 { font-size: 1.4rem; }

  p {
    font-size: 1.6rem;
    color: var(--text-secondary);
  }

  /* Links */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Buttons */
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    color: inherit;
  }

  /* Forms */
  input, select, textarea {
    font-family: inherit;
    color: inherit;
  }

  /* Cards */
  .card {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 1rem;
    transition: var(--transition);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .gradient-text {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .gradient-border {
    position: relative;
    border-radius: 20px;
    padding: 1px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 20px;
      padding: 1px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.6rem;
    transition: var(--transition);

    &-primary {
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      color: #000;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 255, 136, 0.2);
      }
    }

    &-secondary {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text);

      &:hover {
        background: var(--card-bg);
        border-color: var(--primary-color);
      }
    }
  }

  /* Grid Layout */
  .grid {
    display: grid;
    gap: 2rem;

    &-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &-3 {
      grid-template-columns: repeat(3, 1fr);
    }

    &-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Flex Layout */
  .flex {
    display: flex;
    gap: 1rem;

    &-center {
      align-items: center;
      justify-content: center;
    }

    &-between {
      align-items: center;
      justify-content: space-between;
    }
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-1 { gap: 1rem; }
  .gap-2 { gap: 2rem; }

  /* Spacing */
  .m-1 { margin: 1rem; }
  .m-2 { margin: 2rem; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }

  .p-1 { padding: 1rem; }
  .p-2 { padding: 2rem; }
  .pt-1 { padding-top: 1rem; }
  .pt-2 { padding-top: 2rem; }
  .pb-1 { padding-bottom: 1rem; }
  .pb-2 { padding-bottom: 2rem; }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease forwards;
  }

  /* Loading Spinner */
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--card-bg);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #2b2b2b;
  }

  ::-webkit-scrollbar-thumb {
    background: #6b6b6b;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #959595;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    html {
      font-size: 56.25%;
    }

    .grid {
      &-2, &-3, &-4 {
        grid-template-columns: 1fr;
      }
    }

    .crypto-stats {
      grid-template-columns: 1fr;
    }

    .container {
      padding: 0 0.5rem;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 50%;
    }
  }

  /* Utility Classes */
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-primary { color: var(--primary-color); }
  .text-secondary { color: var(--text-secondary); }
  .bg-primary { background-color: var(--primary-color); }
  .bg-secondary { background-color: var(--secondary-color); }
  .rounded { border-radius: 8px; }
  .shadow { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }

  /* Crypto-themed elements */
  .crypto-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--primary-color);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  .crypto-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    transition: var(--transition);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 255, 136, 0.1);
      border-color: var(--primary-color);

      &::before {
        transform: translateX(100%);
      }
    }
  }

  .crypto-chart {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.05), transparent);
      animation: chartShine 3s infinite;
    }
  }

  @keyframes chartShine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .crypto-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: var(--transition);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }

    &:hover {
      transform: translateY(-3px);
      border-color: var(--primary-color);
      box-shadow: 0 8px 24px rgba(0, 255, 136, 0.1);

      &::before {
        transform: translateX(100%);
      }
    }

    .stat-value {
      font-size: 2.4rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: var(--text-secondary);
      font-size: 1.4rem;
    }
  }

  .crypto-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.4rem;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    border: none;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }

    &:hover::before {
      transform: translateX(100%);
    }

    &-primary {
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      color: #000;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 255, 136, 0.2);
      }
    }

    &-secondary {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text);

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--primary-color);
      }
    }
  }

  .crypto-input {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.2rem;
    color: var(--text);
    font-size: 1.4rem;
    transition: var(--transition);
    width: 100%;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.1);
      background: rgba(255, 255, 255, 0.05);
    }

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  .crypto-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    background: rgba(0, 255, 136, 0.1);
    color: var(--primary-color);
    border: 1px solid rgba(0, 255, 136, 0.2);

    &-success {
      background: rgba(0, 255, 136, 0.1);
      color: var(--primary-color);
      border-color: rgba(0, 255, 136, 0.2);
    }

    &-error {
      background: rgba(255, 68, 68, 0.1);
      color: var(--error);
      border-color: rgba(255, 68, 68, 0.2);
    }

    &-warning {
      background: rgba(255, 187, 51, 0.1);
      color: var(--warning);
      border-color: rgba(255, 187, 51, 0.2);
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

export default GlobalStyles; 