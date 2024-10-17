
const executeButton = document.getElementById('execute');
const outputTextArea = document.getElementById('output');

executeButton.addEventListener('click', async () => {
  const code = document.getElementById('code').value;
  outputTextArea.value = ''; // Clear output

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
      import { fetch } from '@tauri-apps/plugin-http';
      
      ${code}
    `;
    
    // Append the <script> to the body
    document.body.appendChild(script);

    outputTextArea.value = 'Code executed successfully, see the details on the console of DevTools!';
  } catch (error) {
    outputTextArea.value = `Error: ${error.message}`;
  }
});