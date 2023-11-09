async function chatgptCall(systemSettings, userInput, chatDiv, chunk) {
  // نرسل طلبا إلى نقطة النهاية بالمعاملات
  const response = await fetch('/gpt-api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system_settings: systemSettings,
      user_input: userInput,
      chunk: chunk
    }),
  });

  // ندخل البيانات المتدفقة إلى حقل المخرجات
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = new TextDecoder().decode(value);
    chatDiv.innerHTML += chunk;
  }
}

function clipboard(inputField) {
  // نشير إلى الحقل ونقوم باستخراح النص لكي نضيفة إلى الحافظة لكي ينسخ
  var copyText = document.getElementById(inputField);
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
}

function generateImage() {
  // نشير إلى الوصف من أجل استخدام النموذج له، ونشير إلى زر الرسم لكي نظهر أن العملية جارية، ونشير إلى حقل المخرجات لإضافة الصورة
  const promptInput = document.getElementById('keywords');
  const drawButton = document.getElementById('drawButton');
  const outputImage = document.getElementById('outputImage');
  drawButton.style.backgroundColor = '#99d1ff';
  drawButton.style.borderColor = '#99d1ff';
  drawButton.innerHTML = 'جاري التحميل...';

  // نستخرج الوصف من الحقل
  const prompt = promptInput.value;

  // نرسل طلبًا إلى نقطة النهاية لإنشاء الصورة وضيف بيانات الصورة إلى حقل الصورة، ونغير الزر إلى لوه الأصلي
  fetch('/sd-api', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: prompt })
  })
  .then(response => response.json())
  .then(data => {
      const imageUrl = data.imageUrl;
      outputImage.src = imageUrl;
      drawButton.style.backgroundColor = '';
      drawButton.style.borderColor = '';
      drawButton.innerHTML = 'إعادة رسم';
  })
  .catch(error => {
      console.error('Error fetching data:', error);
      drawButton.style.backgroundColor = '';
      drawButton.style.borderColor = '';
      drawButton.innerHTML = 'إعادة رسم';
  });
}

function downloadImage() {
  // نقوم بالإشارة إلى حقل الصورة وصناعة عنصر ببياناتها لكي نسمح بتنزيلها
  const outputImage = document.getElementById('outputImage');
  const downloadLink = document.createElement('a');
  downloadLink.href = outputImage.src;
  downloadLink.download = 'downloaded_image.jpg';
  document.body.appendChild(downloadLink);
  // نقوم بالضغط برمجيا من أجل تنزيل الصورة، ثم نزيل العنصر
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
