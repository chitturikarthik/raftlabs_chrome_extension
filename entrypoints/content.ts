window.addEventListener('message', (event) => {
  if (event.data.type === 'CONNECT_ALL') {
    const connectButtons = document.querySelectorAll('button');
    let count = 0;

    connectButtons.forEach((button: HTMLElement) => {
      if (button.innerText === 'Connect') {
        setTimeout(() => {
          button.click();
          count++;
          if (count === connectButtons.length) {
            window.postMessage({ type: 'COMPLETE' }, '*');
          }
        }, Math.random() * 2000 + 1000); // 1-3 seconds delay
      }
    });
  }
});
