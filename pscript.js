document.addEventListener('DOMContentLoaded', function() {

    const firstName = localStorage.getItem('First name');
    const lastName = localStorage.getItem('Last name');
    const email = localStorage.getItem('Email-id');
    const mob = localStorage.getItem('Mobile No.');
    const dob = localStorage.getItem('Date of Birth');
    const city = localStorage.getItem('City of residence');
    const wor=localStorage.getItem('Words that describe you (like engineer, student, etc.)')
    const profilePhoto = localStorage.getItem('Profile Photo');
    const educationData = JSON.parse(localStorage.getItem('Education')) || [];
    const SkillData = JSON.parse(localStorage.getItem('Skills')) || [];
    const linkData = JSON.parse(localStorage.getItem('Links')) || [];

    if (profilePhoto) {
        document.getElementById('profile-photo').src = profilePhoto;
    }

    document.getElementById('name').textContent = `${firstName} ${lastName}`;
    document.getElementById('email').textContent = `${email}`;
    document.getElementById('dob').textContent = `Date of Birth: ${dob}`;
    document.getElementById('city').textContent = `City: ${city}`;
    document.getElementById('words').textContent = `${wor}`;
    document.getElementById('mobile').textContent = `${mob}`;

    const educationList = document.getElementById('education-list');
    educationData.forEach(edu => {
        const li = document.createElement('p');
        li.classList.add('education-entry');
        li.textContent = `${edu.degree} from ${edu.institution} | Ends: ${edu.year} | Performance: ${edu.performance} ${edu.performanceUnit}`;
        educationList.appendChild(li);
    });

    const SkillList = document.getElementById('Skills');
    SkillData.forEach(cat => {
        const li = document.createElement('p');
        li.classList.add('skill-entry');
        li.textContent = `${cat.category} : ${cat.litem}`;
        SkillList.appendChild(li);
    });

    const linkList = document.getElementById('link-list');
    linkData.forEach(link => {
        const li = document.createElement('div');
        li.classList.add('listitemdiv');
        const a = document.createElement('a');
        li.classList.add('link-entry');
        a.href = link.profileURL;
        a.textContent = link.websiteName;
        a.target = '_blank'; 

        const favicon = document.createElement('img');
        const url = new URL(link.profileURL);
        favicon.src = `https://www.google.com/s2/favicons?domain=${url.hostname}`;
        favicon.alt = 'favicon';
        favicon.style.width = '25px';
        favicon.style.height = '25px';
        favicon.style.marginRight = '12px';

        li.appendChild(favicon);
        li.appendChild(a);
        linkList.appendChild(li);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var coll = document.getElementsByClassName('collapsible');
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }
});