// Seleciona o input de busca
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const value = formartString(event.target.value);
    
    const cursos = document.querySelectorAll('.curso');
    const noResults = document.getElementById('sem-cursos');    

    let hasResults = false;
    
    if (value != '') {
        cursos.forEach((curso) => {
            const cursoTitulo = curso.querySelector('.titulo').textContent;
            if(formartString(cursoTitulo).indexOf(value) !== -1) {
                curso.style.display = 'flex';
                
                hasResults = true;
            } else {
                curso.style.display = 'none';   
            };

            if(hasResults) {
                noResults.style.display = 'none';
                
            } else {
                noResults.style.display = 'block';
            }
        });        
    } else { 
        cursos.forEach((curso) => {
            curso.style.display = 'none';
        });
        noResults.style.display = 'none';
    }
});

function formartString(value) {
    return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
});