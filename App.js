import React, { useState } from 'react';
import './App.css';
import { BsBackspace } from 'react-icons/bs';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing Sun and Moon icons

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [previousValue, setPreviousValue] = useState(null);
  const [openParentheses, setOpenParentheses] = useState(0);
  const [isNightMode, setIsNightMode] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearLastCharacter = () => {
    const updatedValue = displayValue.slice(0, -1) || '0';
    const lastChar = displayValue.slice(-1);
    if (lastChar === '(') {
      setOpenParentheses(openParentheses - 1);
    } else if (lastChar === ')') {
      setOpenParentheses(openParentheses + 1);
    }
    setDisplayValue(updatedValue);
  };

  const clearAll = () => {
    setDisplayValue('0');
    setOpenParentheses(0);
  };

  const toggleParentheses = () => {
    if (displayValue === '0' || waitingForOperand) {
      setDisplayValue('(');
      setOpenParentheses(openParentheses + 1);
      setWaitingForOperand(false);
    } else if (/\d$/.test(displayValue)) {
      if (openParentheses > 0) {
        setDisplayValue(displayValue + ')');
        setOpenParentheses(openParentheses - 1);
      } else {
        setDisplayValue(displayValue + '(');
        setOpenParentheses(openParentheses + 1);
      }
    } else {
      setDisplayValue(displayValue + '(');
      setOpenParentheses(openParentheses + 1);
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue == null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate[operator](currentValue, inputValue);

      setPreviousValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = {
    '/': (prev, next) => prev / next,
    '*': (prev, next) => prev * next,
    '+': (prev, next) => prev + next,
    '-': (prev, next) => prev - next,
    '=': (prev, next) => next
  };

  const toggleTheme = () => {
    setIsNightMode(!isNightMode);
  };

  const styles = {
    calculator: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      backgroundColor: isNightMode ? '#1B0C3E' : '#e0e0e0',
      color: isNightMode ? 'yellow' : '#333',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      position: 'relative',
      boxShadow: isNightMode ? 'inset 10px 10px 20px #000' : 'inset 10px 10px 20px #bebebe, inset -10px -10px 20px #fff'
    },
    displayContainer: {
      position: 'relative',
      width: '90%',
      maxWidth: '500px',
      marginBottom: '20px',
    },
    sumDisplay: {
      position: 'absolute',
      top: '10px',
      right: '20px',
      fontSize: '1em',
      color: isNightMode ? 'yellow' : 'black',
    },
    display: {
      fontSize: '2.5em',
      textAlign: 'right',
      padding: '20px 10px',
      backgroundColor: 'transparent',
      color: isNightMode ? 'yellow' : 'black',
      width: '100%',
      border: 'none',
      outline: 'none',
    },
    keypad: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '90%',
      maxWidth: '500px',
    },
    table: {
      display: 'grid',
      gap: '20px',
      width: '100%',
    },
    row: {
      display: 'flex',
      gap: '20px',
    },
    key: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80px',
      height: '80px',
      fontSize: '1.5em',
      border: 'none',
      borderRadius: '50%',
      backgroundColor: isNightMode ? 'rgba(0, 0, 0, 0.1)' : '#e0e0e0',
      color: isNightMode ? 'yellow' : '#333',
      cursor: 'pointer',
      boxShadow: isNightMode ? '10px 10px 20px #000, -10px -10px 20px #000' : '10px 10px 20px #bebebe, -10px -10px 20px #fff',
      transition: 'all 0.3s ease-in-out',
      transform: 'translateY(0px)',
    },
    keySpecial: {
      backgroundColor: isNightMode ? 'rgba(0, 0, 0, 0.1)' : '#f0f0f0',
      color: isNightMode ? 'yellow' : '#333',
    },
    keyOperator: {
      backgroundColor: isNightMode ? 'rgba(0, 0, 0, 0.1)' : '#ff9800',
      color: isNightMode ? 'yellow' : 'white',
    },
    keyZero: {
      borderRadius: '40px',
      width: '180px',
      justifyContent: 'start',
      paddingLeft: '30px',
      backgroundColor: isNightMode ? 'rgba(0, 0, 0, 0.1)' : '#e0e0e0',
      color: isNightMode ? 'yellow' : '#333',
    },
    themeIcon: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.calculator}>
      {isNightMode ? (
        <FaSun
          style={styles.themeIcon}
          onClick={toggleTheme}
        />
      ) : (
        <FaMoon
          style={styles.themeIcon}
          onClick={toggleTheme}
        />
      )}
      <div style={styles.displayContainer}>
        <div style={styles.sumDisplay}>
          {previousValue !== null && !waitingForOperand ? previousValue : ''}
        </div>
        <div style={styles.display}>{displayValue}</div>
      </div>
      <div style={styles.keypad}>
        <div style={styles.table}>
          <div style={styles.row}>
            <button style={{ ...styles.key, ...styles.keySpecial }} onClick={clearAll}>
              C
            </button>
            <button style={{ ...styles.key, ...styles.keySpecial }} onClick={clearLastCharacter}>
              <BsBackspace />
            </button>
            <button style={{ ...styles.key, ...styles.keySpecial }} onClick={toggleParentheses}>
              ( )
            </button>
            <button style={{ ...styles.key, ...styles.keyOperator }} onClick={() => performOperation('/')}>
              ÷
            </button>
          </div>
          <div style={styles.row}>
            <button style={styles.key} onClick={() => inputDigit(7)}>
              7
            </button>
            <button style={styles.key} onClick={() => inputDigit(8)}>
              8
            </button>
            <button style={styles.key} onClick={() => inputDigit(9)}>
              9
            </button>
            <button style={{ ...styles.key, ...styles.keyOperator }} onClick={() => performOperation('*')}>
              ×
            </button>
          </div>
          <div style={styles.row}>
            <button style={styles.key} onClick={() => inputDigit(4)}>
              4
            </button>
            <button style={styles.key} onClick={() => inputDigit(5)}>
              5
            </button>
            <button style={styles.key} onClick={() => inputDigit(6)}>
              6
            </button>
            <button style={{ ...styles.key, ...styles.keyOperator }} onClick={() => performOperation('-')}>
              −
            </button>
          </div>
          <div style={styles.row}>
            <button style={styles.key} onClick={() => inputDigit(1)}>
              1
            </button>
            <button style={styles.key} onClick={() => inputDigit(2)}>
              2
            </button>
            <button style={styles.key} onClick={() => inputDigit(3)}>
              3
            </button>
            <button style={{ ...styles.key, ...styles.keyOperator }} onClick={() => performOperation('+')}>
              +
            </button>
          </div>
          <div style={styles.row}>
            <button style={{ ...styles.key, ...styles.keyZero }} onClick={() => inputDigit(0)}>
              0
            </button>
            <button style={styles.key} onClick={inputDot}>
              .
            </button>
            <button style={{ ...styles.key, ...styles.keyOperator }} onClick={() => performOperation('=')}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;