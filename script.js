document.getElementById('checkBtn').addEventListener('click', () => {
  const email = document.getElementById('emailInput').value.trim();
  const resultDiv = document.getElementById('result');
  const btn = document.getElementById('checkBtn');

  resultDiv.classList.remove('show');

  if (!email) {
    resultDiv.textContent = 'دخل ايميل';
    resultDiv.style.color = '#f44336';
    resultDiv.classList.add('show');
    return;
  }

  btn.classList.add('loading');
  resultDiv.textContent = '';

  const originalUrl = `https://ammarnushhsaaa.pythonanywhere.com/?email=${encodeURIComponent(email)}`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

  axios.get(proxyUrl)
    .then(response => {
      let data;
      try {
        data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      } catch (e) {
        throw new Error('Invalid JSON');
      }
      if (data.response === true) {
        resultDiv.textContent = `ايميل غير مستخدم في جيميل`;
        resultDiv.style.color = '#4caf50';
      } else if (data.response === false) {
        resultDiv.textContent = `ايميل مستخدم في جيميل`;
        resultDiv.style.color = '#f44336';
      } else {
        resultDiv.textContent = 'حدث خطا';
        resultDiv.style.color = '#ff9800';
      }
    })
    .catch(error => {
      console.error(error);
      resultDiv.textContent = 'حدث خطا';
      resultDiv.style.color = '#f44336';
    })
    .finally(() => {
      btn.classList.remove('loading');
      resultDiv.classList.add('show');
    });
});
