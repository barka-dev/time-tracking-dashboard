
const container = document.querySelector('#container');

const fetch_data = (period) => {
    fetch('/data.json')
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
    
            return response.json();
        })
        .then(data => {
            data.forEach(info => {
                const article = 
                `<article>
                    <section>
                        <div>
                            <strong>${info.title}</strong>
                            <img src="./images/icon-ellipsis.svg"/>
                        </div>
                        <div>
                            <h2>${info.timeframes[period].current}hrs</h2>
                            <p>Last Week - ${info.timeframes[period].previous}hrs</p>
                        </div>
                    </section>
                </article>`;
                container.insertAdjacentHTML('beforeend', article);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error )
        });
}

const clear_container = () =>{
    while(container.children.length > 1){
        container.removeChild(container.children[1]);
    }
}

const links = document.querySelectorAll('.links');

links.forEach(link => {
    if(link.classList.contains('active')){
        fetch_data(link.textContent.toLowerCase());
    }

    link.addEventListener('click', (e)=>{
        links.forEach(item=>{
            item.classList.remove('active');
        });
        e.target.classList.add('active');
        clear_container();
        fetch_data(e.target.textContent.toLowerCase());
    });
});
