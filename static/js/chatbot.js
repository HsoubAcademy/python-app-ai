async function sendMessage() {
    // نقوم باستخراج المدخلات وإخلاء ساحة المدخلات
    const userInput = document.getElementById('humanInput').value;
    document.getElementById('humanInput').value = '';
  
    // نقوم بإضافة رسالة المستخدم إلى تاريخ الرسائل
    const newMessage = document.createElement("div");
    newMessage.classList.add('humanMessage')
    newMessage.innerHTML = userInput;
  

    const messageList = document.getElementById('messageList');
    messageList.appendChild(newMessage);
  
    // نقوم بإضافة عنصر جديد لرسالة البوت  
    const replyMessage = document.createElement("div");
    replyMessage.classList.add('botMessage')
    messageList.appendChild(replyMessage);
    // نحدد رسالة النظام
    const systemSettings = 'You are a chat bot. Please reply in Arabic.';
  
    // نقوم بعمل طلب للنموذج
    await chatgptCall(systemSettings, userInput, replyMessage);
  }
  
  function langchainSend() {
    // نقوم باستخراج المدخلات لكي نقوم بصناعة عنصر خاص بها كرسالة، ثم نضيفها إلى تاريخ الرسائل
    const userInput = document.getElementById('humanInput').value;
  
    const newMessage = document.createElement("div");
    newMessage.classList.add('humanMessage')
    newMessage.innerHTML = userInput;
  
    const messageList = document.getElementById('messageList');
    messageList.appendChild(newMessage);
  
    // نقوم أيضا بصناعة عنصر لرسالة البوت ونضيف لها رد النموذ
    const replyMessage = document.createElement("div");
    replyMessage.classList.add('botMessage')
    messageList.appendChild(replyMessage);
    replyMessage.innerHTML = 'نفكر...'
    document.getElementById('humanInput').value = '';
    const url = '/langchain-gpt';
    const data = {
      user_input: userInput
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(text => {
      replyMessage.innerHTML = text;
    })
  }
  
  