// header section starts
document.addEventListener('DOMContentLoaded', function() {
    fetch('parts_of_page/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
});
// header section ends
