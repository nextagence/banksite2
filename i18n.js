export const dict = {
  ru: {
    nav_home:"Главная", nav_deck:"Инвест-питч", nav_app:"Кабинет",
    lead_title:"Запросить ранний доступ",
    lead_sub:"Оставь контакты — мы пришлём доступ к бете и условия пилота.",
    name:"Имя", contact:"Телефон или Telegram", role:"Роль/компания", note:"Комментарий",
    send:"Отправить", sent_ok:"Заявка отправлена ✅",
    sent_fail:"Не удалось отправить. Проверь настройки.",
    legal:"NovaPay — технологическая платформа. Не банк. Не депозиты. Не кредиты. Операции через лицензированных партнёров."
  },
  kk: {
    nav_home:"Басты бет", nav_deck:"Инвест-питч", nav_app:"Кабинет",
    lead_title:"Ерте қолжетімділік сұрау",
    lead_sub:"Контакт қалдыр — бетаға қолжетімділік пен пилот шарттарын жібереміз.",
    name:"Аты", contact:"Телефон немесе Telegram", role:"Рөл/компания", note:"Пікір",
    send:"Жіберу", sent_ok:"Өтінім жіберілді ✅",
    sent_fail:"Жіберілмеді. Баптауды тексер.",
    legal:"NovaPay — технологиялық платформа. Банк емес. Депозит емес. Несие емес. Операциялар лицензияланған серіктестер арқылы."
  }
};

export function getLang(){
  const l = localStorage.getItem("np_lang");
  return (l==="kk"||l==="ru") ? l : "ru";
}
export function setLang(l){
  localStorage.setItem("np_lang", l);
  location.reload();
}
export function t(key){
  const L = getLang();
  return (dict[L] && dict[L][key]) || dict.ru[key] || key;
}
export function applyI18n(){
  document.documentElement.lang = getLang();
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  const ru = document.getElementById("lang-ru");
  const kk = document.getElementById("lang-kk");
  if(ru && kk){
    ru.classList.toggle("active", getLang()==="ru");
    kk.classList.toggle("active", getLang()==="kk");
  }
}
