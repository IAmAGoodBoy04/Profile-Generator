const ebutton=document.querySelector("#Edbutton");
const pbutton=document.querySelector("#Pbutton");
const lbutton=document.querySelector("#Lbutton");
const eblock=document.querySelector("#edblock");
const pblock=document.querySelector("#pblock");
const lblock=document.querySelector('#lblock');
const eblktemp=document.querySelector("#eblk");
const pblktemp=document.querySelector("#pblk");
const lblktemp=document.querySelector("#lblk");
const outcont=document.querySelector(".outer_cont");
const next=document.querySelector("#Next");

ebutton.addEventListener("click", ()=>{
    let newelem=eblktemp.content.cloneNode(true);
    eblock.appendChild(newelem);
})

pbutton.addEventListener("click", ()=>{
    let newelem=pblktemp.content.cloneNode(true);
    pblock.appendChild(newelem);
})

lbutton.addEventListener("click", ()=>{
    let newelem=lblktemp.content.cloneNode(true);
    lblock.appendChild(newelem);
})

outcont.addEventListener("click", (e)=>{
    if(e.target && e.target.classList.contains("rem")){
        const rnode=e.target.closest(".delfield");
        if(rnode){
            rnode.remove();
        }
    }
});

outcont.addEventListener("change", (e)=>{
    if(e.target && e.target.classList.contains("finput")){
        const imgfile=e.target.files[0];
        if(imgfile){
            const reader = new FileReader();
            reader.onload = function(event) {
                const previewImage = e.target.nextElementSibling;
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(imgfile);
        }
    }
})

const alpha_fields=['First name','Last name','City of residence', 'Words that describe you (like engineer, student, etc.)','Degree/Certificate','Institute'];

const toloc=['First name','Last name','City of residence', 'Words that describe you (like engineer, student, etc.)','Email-id','Mobile No.'];

next.addEventListener("click", function validate(e){
    const required=document.querySelectorAll(".req");

    for(i=0;i<required.length;i++){
        let placeholder=required[i].placeholder;
        let value=required[i].value.trim();
        if(value===""){
            required[i].scrollIntoView({behavior:"smooth",block:"center"});
            required[i].focus();
            alert(`Please fill the ${placeholder} field`);
            return;
        }
        if(alpha_fields.includes(placeholder)){
            if (!/^[A-Za-z,\s]+$/.test(value)) {
                alert(`${placeholder} should contain only alphabetic characters.`);
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                field.focus();
                return;
            }
        }
        if (placeholder === 'Email-id') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                alert('Please enter a valid email address.');
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                field.focus();
                return;
            }
        }
        if (placeholder === 'Profile URL' || placeholder==='Link') {
            try {
                new URL(value);
            } catch (_) {
                alert(`Please enter a valid URL for ${placeholder}.`);
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                field.focus();
                return;
            }
        }

        if(placeholder==='Mobile No.' || placeholder==='Year'){
            if(!/^[0-9\-\+\s]+$/.test(value)){
                alert(`Enter valid ${placeholder}`);
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                field.focus();
                return;
            }
        }
        if(toloc.includes(placeholder)){
            localStorage.setItem(placeholder, value);
        }
    }
    const dobField = document.getElementById('dob');
    const currentDate=new Date();
    const minDate=new Date('1924-01-01');
    if (!dobField.value) {
        alert('Please fill the Date of Birth field.');
        dobField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        dobField.focus();
        isValid = false;
        return;
    }
    else if(dobField.valueAsDate>=currentDate){
        alert('Date of Birth must be before the current date.');
        return;
    }
    else if(dobField.valueAsDate<minDate){
        alert('Date of Birth must be after January 1, 1924.');
        return;
    }
    else {
        localStorage.setItem('Date of Birth', dobField.value);
    }

    // Check if the profile photo is attached
    const profilePhotoField = document.querySelector('input[name="profile_photo"]');
    if (!profilePhotoField.files.length) {
        alert('Please attach a profile photo.');
        profilePhotoField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        profilePhotoField.focus();
        isValid = false;
        return;
    } else {
        const reader = new FileReader();
        reader.onload = function(event) {
            localStorage.setItem('Profile Photo', event.target.result);
        };
        reader.readAsDataURL(profilePhotoField.files[0]);
    }

    const educationEntries = document.querySelectorAll('.education-entry');
    const educationData = [];
    educationEntries.forEach(entry => {
        const degree = entry.querySelector('input[placeholder="Degree/Certificate"]').value.trim();
        const institution = entry.querySelector('input[placeholder="Institute"]').value.trim();
        const year = entry.querySelector('input[placeholder="Year"]').value.trim();
        const performance = entry.querySelector('input[placeholder="Performance"]').value.trim();
        const performanceUnit = entry.querySelector('select[placeholder="Performance Unit"]').value;

        educationData.push({
            degree,
            institution,
            year,
            performance,
            performanceUnit
        });
    });
    localStorage.setItem('Education', JSON.stringify(educationData));

    const SkillEntries = document.querySelectorAll('.project-entry');
    const SkillData = [];
    SkillEntries.forEach(entry => {
        const category = entry.querySelector('input[placeholder="Category"]').value.trim();
        const litem = entry.querySelector('input[placeholder="List-items"]').value.trim();
        SkillData.push({
            category,litem
        });
    });
    localStorage.setItem('Skills', JSON.stringify(SkillData));

    const linkEntries = document.querySelectorAll('.link-entry');
    const linkData = [];
    linkEntries.forEach(entry => {
        const websiteName = entry.querySelector('input[placeholder="Website name"]').value.trim();
        const profileURL = entry.querySelector('input[placeholder="Profile URL"]').value.trim();

        linkData.push({
            websiteName,
            profileURL
        });
    });
    localStorage.setItem('Links', JSON.stringify(linkData));

    window.location.href = 'portfolio.html';

})


