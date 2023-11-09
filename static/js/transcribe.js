async function transcribeFunction() {
    // الإشارة إلى بعض العناصر وتغيير حال الزر
    const transcribeButton = document.querySelector('#transcribeAudio');
    const textarea = document.getElementById('toSummarize');
    const fileInput = document.getElementById('file');
    transcribeButton.innerHTML = 'جاري التفريغ...'
    transcribeButton.style.background = '#99d1ff';
    transcribeButton.style.borderColor = '#99d1ff';

    // تهيئة الملف من أجل إرساله
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    // نقوم بعمل الطلب إلى نقطة النهاية
    const response = await fetch('/transcribe-api', {
      method: 'POST',
      body: formData,
    });

    // نتأكد إن كان حدث خطأ
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // نقوم بوضع الرد في ساحة المخرجات
    const transcription = await response.text();
    textarea.value = transcription;

    // نرجع الزر إلى حاله الأصلي ثم نستدعي الدالة التالية
    transcribeButton.innerHTML = 'اكتب'
    transcribeButton.style.background = '';
    transcribeButton.style.borderColor = '';
    writeKeywords();
};

async function writeKeywords() {
  // نقوم بالإشارة إلى ساحة المخرجات، وتحديد رسالة النظام واستخراج المدخلات وإرسالها إلى النموذج، ثم نستدعي الدالة التالية
  const chatDiv = document.getElementById('keywords');
  const systemSettings = 'You must write keywords/tags based on the user input. These keywords/tags must be in Arabic.';
  const userInput = document.getElementById('toSummarize').value.slice(0, 3000);
  await chatgptCall(systemSettings, userInput, chatDiv);
  generateImage();
};