(function(){
  var KEY = "kp_hiring_banner_v1";
  var DAYS = 30;
  function getSaved(){
    try{ return JSON.parse(localStorage.getItem(KEY)||"null"); }catch(e){ return null; }
  }
  function saveNow(){
    try{
      localStorage.setItem(KEY, JSON.stringify({ hiddenAt: Date.now() }));
    }catch(e){/* no-op */}
  }
  function withinDays(ts, days){
    var ms = days*24*60*60*1000;
    return (Date.now() - ts) < ms;
  }
  function init(){
    var banner = document.querySelector(".hiring-banner");
    if(!banner) return;
    var saved = getSaved();
    if(saved && saved.hiddenAt && withinDays(saved.hiddenAt, DAYS)){
      banner.classList.add("is-hidden");
      return;
    }
    var btn = banner.querySelector(".hiring-dismiss");
    if(btn){
      btn.addEventListener("click", function(){
        banner.classList.add("is-hidden");
        saveNow();
      });
    }
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
