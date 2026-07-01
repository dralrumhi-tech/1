// =========================================
// Designing.om
// WhatsApp Order System
// =========================================

// ضع رقم الواتساب الخاص بك هنا
const whatsappNumber = "96890000000";

const form = document.getElementById("orderForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const designType = document.getElementById("designType").value;
    const size = document.getElementById("size").value;
    const colors = document.getElementById("colors").value;
    const delivery = document.getElementById("delivery").value;
    const description = document.getElementById("description").value;
    const reference = document.getElementById("reference").value;

    let message =
`✨ طلب تصميم جديد

👤 الاسم:
${name}

📱 رقم التواصل:
${phone}

🎨 نوع التصميم:
${designType}

📐 المقاس:
${size || "غير محدد"}

🎨 الألوان المطلوبة:
${colors || "غير محددة"}

📅 موعد التسليم:
${delivery || "غير محدد"}

📝 وصف التصميم:

${description}

🔗 التصميم المرجعي:

${reference || "لا يوجد"}

--------------------------
Designing.om Website`;

    const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

});
