console.info(`running main.js`);

import { codeSnippets } from './code_snippets.js';

const editor = document.getElementById('editor')
const executeButton = document.getElementById('execute');
const outputTextArea = document.getElementById('output');
const demoSelect = document.getElementById('demo-select');

// Function to redirect console methods
const redirectConsoleOutput = () => {
  const originalLog = console.log;
  const originalInfo = console.info;
  const originalWarn = console.warn;
  const originalError = console.error;

  // Custom handler to redirect output to the textarea
  const logToOutput = (method, args) => {
    originalLog.apply(console, args); // Also call the original method to keep logging to console
    outputTextArea.value += `[${method.toUpperCase()}] ${args.join(' ')}\n`;
  };

  // Override console methods
  console.log = (...args) => logToOutput('log', args);
  console.info = (...args) => logToOutput('info', args);
  console.warn = (...args) => logToOutput('warn', args);
  console.error = (...args) => logToOutput('error', args);
};

// init demoSelect options
for (const key in codeSnippets) {
  const option = document.createElement('option');
  option.value = key;
  option.text = codeSnippets[key].title;
  demoSelect.appendChild(option);
}

// Function to load demo code into the editor
const loadDemoCode = (demo) => {
  const code = codeSnippets[demo].code;
  editor.value = code;
};

// Set up the Execute button click handler
executeButton.addEventListener('click', async () => {
  const code = editor.value;
  outputTextArea.value = ''; // Clear output

  // Redirect console output
  redirectConsoleOutput();

  try {
    // Remove any previous <script> tags that were added dynamically
    const oldScript = document.getElementById('dynamicScript');
    if (oldScript) {
      oldScript.remove();
    }

    // Create a new <script> tag to execute the user code
    const script = document.createElement('script');
    script.id = 'dynamicScript';
    script.type = 'module'; // Ensure the module scope if needed
    script.innerHTML = `
    ${code}
    `;

    // Append the <script> to the body
    document.body.appendChild(script);

  } catch (error) {
    outputTextArea.value = `Error: ${error.message}`;
  }
});

// Set up the demo select change handler
demoSelect.addEventListener('change', (event) => {
  loadDemoCode(event.target.value);
});

// Load the initial demo code
loadDemoCode(demoSelect.value);
