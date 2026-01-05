let STATE = null;
let TX = [];

const $ = (id)=>document.getElementById(id);
const fmtKZT = (n)=> new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " KZT";
const fmtUSDT = (n)=> (Math.round(n*100)/100).toFixed(2) + " USDT";

function statusPill(s){
  if(s==="ok") return `<span class="status ok">OK</span>`;
  if(s==="pending") return `<span class="status pending">PENDING</span>`;
  return `<span class="status">FAIL</span>`;
}

window.setTab = function(tab){
  document.querySelectorAll("[id^='tab-']").forEach(el=>el.style.display="none");
  $("tab-"+tab).style.display="block";
  document.querySelectorAll(".menu button").forEach(b=>{
    b.classList.toggle("active", b.getAttribute("data-tab")===tab);
  });
};

function toast(title, msg){
  const el = $("toast");
  $("toastT").textContent = title;
  $("toastS").textContent = msg;
  el.classList.add("show");
  clearTimeout(window.__tt);
  window.__tt = setTimeout(()=>el.classList.remove("show"), 2200);
}

async function fetchJSON(path){
  const res = await fetch(path, { cache: "no-store" });
  if(!res.ok) throw new Error("Fetch failed: "+path);
  return res.json();
}

function render(){
  if(!STATE) return;

  $("userName").textContent = STATE.user?.name || "User";
  $("userKyc").textContent = "KYC: " + (STATE.kyc || "—");

  $("balKZT").textContent = fmtKZT(STATE.balanceKZT || 0);
  $("balUSDT").textContent = fmtUSDT(STATE.balanceUSDT || 0);

  const c = STATE.card || {};
  $("card").textContent = c.issued ? `${c.scheme} • **** ${c.last4 || "0000"}${c.frozen ? " (frozen)" : ""}` : "Не выпущена";

  const body = $("txBody");
  body.innerHTML = "";
  TX.slice(0,12).forEach(tx=>{
    const tr = document.createElement("tr");
    tr.className = "row";
    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.type}</td>
      <td class="mono">${fmtKZT(tx.amount)}</td>
      <td>${statusPill(tx.status)}</td>
    `;
    body.appendChild(tr);
  });
}

window.reloadData = async function(){
  try{
    STATE = await fetchJSON("./api/state.json");
    TX = await fetchJSON("./api/tx.json");
    render();
    toast("OK","Данные обновлены");
  }catch(e){
    toast("ERR", "Не удалось загрузить api/*.json");
  }
};

window.addEventListener("DOMContentLoaded", ()=>window.reloadData());
