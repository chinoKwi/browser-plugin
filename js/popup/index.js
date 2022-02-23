document.querySelector("#ok").addEventListener("click", function set_data() {
  const val = document.querySelector("#url").value;
  chrome.storage.sync.set({ img_url: val });
  document.querySelector("#ok").innerHTML = "存储成功";
  document.querySelector("#ok").setAttribute("disabled", true);
});
