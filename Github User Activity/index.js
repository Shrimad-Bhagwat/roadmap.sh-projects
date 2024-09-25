
const http = require('https')

const username = process.argv[2];

if(!username){
    console.log('Please provide a Github username');
    process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

const options = {
    headers: {
        'User-Agent': 'node.js'
    }
};


http.get(url, options, (res)=>{
    let data = '';

    res.on('data', (chunk)=>{
        data+=chunk;
    });

    res.on('end', ()=>{
        if (res.statusCode === 200) {
            try {
                const events = JSON.parse(data);

                events.slice(0, 5).forEach((event) => {
                    switch (event.type) {
                        case 'PushEvent':
                            console.log(`- Pushed ${event.payload.commits.length} commits to ${event.repo.name}`);
                            break;
                        case 'IssuesEvent':
                            console.log(`- ${event.payload.action} an issue in ${event.repo.name}`);
                            break;
                        case 'WatchEvent':
                            console.log(`- Starred ${event.repo.name}`);
                            break;
                        case 'CreateEvent':
                            console.log(`- Created a ${event.payload.ref_type} in ${event.repo.name}`);
                            break;
                        case 'ForkEvent':
                            console.log(`- Forked ${event.repo.name}`);
                            break;
                        default:
                            console.log(`- ${event.type} in ${event.repo.name}`);
                    }
                });
            } catch (error) {
                console.error('Error parsing the response:', error);
            }
        } else if (res.statusCode === 404) {
            console.error('User not found. Please check the username and try again.');
        } else {
            console.error(`Request failed with status code: ${res.statusCode}`);
        }
    })
}).on('error', (error)=>{
    console.error('Error fetching data:', error.message);
    
});

/*
> github-activity Shrimad-Bhagwat

- Pushed 1 commits to Shrimad-Bhagwat/roadmap.sh-projects
- Pushed 1 commits to Shrimad-Bhagwat/roadmap.sh-projects
- Created a repository in Shrimad-Bhagwat/roadmap.sh-projects
- Pushed 1 commits to Shrimad-Bhagwat/roadmap.sh-projects
- Created a repository in Shrimad-Bhagwat/roadmap.sh-projects
- Created a branch in Shrimad-Bhagwat/roadmap.sh-projects
- Pushed 1 commits to Shrimad-Bhagwat/Shrimad-Bhagwat
*/
