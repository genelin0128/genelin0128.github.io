
let text = " We're sorry, but our website is currently experiencing an overload of users and can't process your request" +
    " at the moment.\n\nPlease try again later.\n\nThank you for your patience!\n\n\\";
let count = 0;
let timer;

setInterval(function() {
    let textContent = text.charAt(count);
    if (textContent === '\n') {
        textContent = '<br>';
    }
    if (textContent === '\\') {
        textContent = '<a href=\'https://warehouses.costco.com.tw/contact_zh/contact.action?_gl=1*1jzmsrx*_ga*NTE0NTAyNDQ3LjE2Nzc4MzUzMDY.*_ga_F5DSSB6YJ3*MTY3NzgzNTMwNS4xLjEuMTY3NzgzNjQxOC4wLjAuMA..\' style="text-decoration: none;">If you encounter any problems, please click here to contact us.</a>';
    }
    document.querySelector(".text").innerHTML += textContent;
    count++;
    if (count === text.length) {
        clearInterval(timer);
    }
}, 50);