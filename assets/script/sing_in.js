const useForm = document.getElementById("loginform");
const error = document.getElementById("error");

const pswValid = (pswValue) => {
  let reg =/^[a-zA-Z0-9_]+$/;
  const result = reg.test(pswValue);
  if(!result){
    error.textContent = "Only letters, numbers and general punctuation are allowed";
  } else {
    error.textContent = "";
    return result;
  }
}

const sendInfo = (e) => {
  e.preventDefault();
  const newuser = e.target[0].value;
  const newpsw = pswValid(e.target[1].value.trim());
  if (newuser.trim().length !== 0 && newpsw) {
    const userData = JSON.stringify({
      newuser,
      newpsw,
    });
    const key = `Userdata_${Date.now()}`  
    localStorage.setItem(key, userData);
    window.location.href = "../../Home.html";
  }
};

useForm.addEventListener("submit", sendInfo);

const eyesclicker = document.getElementById("eye");
const pasw = document.getElementById("password");

eyesclicker.addEventListener('click', function(ev) {
  if (pasw.type === "password") {
    pasw.type = "text";
  } else {
    pasw.type = "password";
  }
});