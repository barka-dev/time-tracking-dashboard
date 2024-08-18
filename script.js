
const container = document.querySelector('#container');

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
                        <h2>${info.timeframes.weekly.current}hrs</h2>
                        <p>Last Week - ${info.timeframes.weekly.previous}hrs</p>
                    </div>
                </section>
            </article>`;
            container.insertAdjacentHTML('beforeend', article);
        });
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation', error )
    });