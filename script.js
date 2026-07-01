const whatsappNumber = "96890000000";

// ضع رابط الدفع الحقيقي هنا
const paymentLink = "https://example.com/payment";

document.getElementById("darkBtn").addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const orderId = "D-" + Date.now();

  const order = {
    id: orderId,
    name: document.getElementById("clientName").value,
    phone: document.getElementById("clientPhone").value,
    email: document.getElementById("clientEmail").value,
    designType: document.getElementById("designType").value,
    packageType: document.getElementById("packageType").value,
    colors: document.getElementById("colors").value,
    size: document.getElementById("size").value,
    delivery: document.getElementById("delivery").value,
    description: document.getElementById("description").value,
    paymentMethod: document.getElementById("paymentMethod").value,
    fileName: document.getElementById("fileUpload").files[0]
      ? document.getElementById("fileUpload").files[0].name
      : "لا يوجد ملف",
    status: "جديد",
    rating: "لم يتم التقييم"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  const message = `
طلب تصميم جديد من Designing.om

رقم الطلب:
${order.id}

الاسم:
${order.name}

رقم التواصل:
${order.phone}

البريد:
${order.email || "غير موجود"}

نوع التصميم:
${order.designType}

الباقة:
${order.packageType}

الألوان:
${order.colors || "غير محددة"}

المقاس:
${order.size || "غير محدد"}

موعد التسليم:
${order.delivery || "غير محدد"}

طريقة الدفع:
${order.paymentMethod}

اسم الملف:
${order.fileName}

الوصف:
${order.description}

حالة الطلب:
${order.status}
`;

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  alert("تم تسجيل الطلب. رقم طلبك هو: " + order.id);

  window.open(whatsappUrl, "_blank");

  if (order.paymentMethod !== "الدفع لاحقًا") {
    window.open(paymentLink, "_blank");
  }

  this.reset();
});

function trackOrder() {
  const id = document.getElementById("trackInput").value.trim();
  const result = document.getElementById("trackResult");

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.id === id);

  if (order) {
    result.innerHTML = `
      رقم الطلب: ${order.id}<br>
      الاسم: ${order.name}<br>
      نوع التصميم: ${order.designType}<br>
      الحالة: ${order.status}
    `;
  } else {
    result.innerHTML = "لم يتم العثور على الطلب";
  }
}

function rate(stars) {
  document.getElementById("ratingResult").innerText =
    "شكراً لك، تقييمك هو: " + stars + " نجوم";
}

function loadOrders() {
  const ordersList = document.getElementById("ordersList");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>لا توجد طلبات حتى الآن.</p>";
    return;
  }

  ordersList.innerHTML = "";

  orders.forEach(order => {
    const item = document.createElement("div");
    item.className = "order-item";

    item.innerHTML = `
      <h3>${order.id}</h3>
      <p><strong>العميل:</strong> ${order.name}</p>
      <p><strong>الهاتف:</strong> ${order.phone}</p>
      <p><strong>نوع التصميم:</strong> ${order.designType}</p>
      <p><strong>الباقة:</strong> ${order.packageType}</p>
      <p><strong>الدفع:</strong> ${order.paymentMethod}</p>
      <p><strong>الملف:</strong> ${order.fileName}</p>
      <p><strong>الوصف:</strong> ${order.description}</p>
      <p><strong>الحالة:</strong> ${order.status}</p>

      <select onchange="updateStatus('${order.id}', this.value)">
        <option value="">تغيير الحالة</option>
        <option value="جديد">جديد</option>
        <option value="جاري العمل">جاري العمل</option>
        <option value="بانتظار الدفع">بانتظار الدفع</option>
        <option value="تم التسليم">تم التسليم</option>
      </select>
    `;

    ordersList.appendChild(item);
  });
}

function updateStatus(id, newStatus) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order => {
    if (order.id === id && newStatus !== "") {
      order.status = newStatus;
    }
    return order;
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

function clearOrders() {
  if (confirm("هل أنت متأكد من حذف جميع الطلبات؟")) {
    localStorage.removeItem("orders");
    loadOrders();
  }
}
