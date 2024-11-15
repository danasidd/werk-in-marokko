const myHeaders = new Headers();

myHeaders.append("Authorization", "Bearer 2d150b51925cd776a9db1077d6980c49a15d75185357b818e25223c17b408ce95512a92d5166f1f7b60151b20737e58de7d5212ad5ee6dfc02c59949f41e09f2fd2e9dc9deb164e79c59aa0e4688278bc163eddbe8308062f1e72b6745f979754616a5c16b979c1c695a3496ff8016ec82575329dc3d3bcb63b7719926d914ea");

 

const requestOptions = {

  method: "GET",

  headers: myHeaders,

  redirect: "follow"

};

 

fetch("https://app.loxo.co/api/linkrs/jobs?query=country_code=MA", requestOptions)

  .then((response) => response.text())

  .then((result) => console.log(result))

  .catch((error) => console.error(error));

// Fetch job listings
fetch("https://app.loxo.co/api/linkrs/jobs?query=country_code=MA", requestOptions)
    .then(response => response.json())
    .then(result => {
        const jobListingsDiv = document.getElementById("job-listings");
        result.jobs.forEach(job => {
            const jobDiv = document.createElement("div");
            jobDiv.className = "job-listing";
            jobDiv.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.description}</p>
                <button onclick="showApplyForm('${job.id}')">Apply</button>
            `;
            jobListingsDiv.appendChild(jobDiv);
        });
    })
    .catch(error => console.error('Error fetching jobs:', error));

// Show application form
function showApplyForm(jobId) {
    document.getElementById("jobId").value = jobId;
    document.getElementById("apply-form").style.display = "block";
}

// Handle application form submission
document.getElementById("applicationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const jobId = formData.get("jobId");

    // Submit application
    fetch(`https://app.loxo.co/api/linkrs/jobs/${jobId}/apply`, {
        method: "POST",
        headers: myHeaders,
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert("Application submitted successfully!");
            document.getElementById("apply-form").style.display = "none"; // Hide the form after submission
            document.getElementById("applicationForm").reset(); // Reset the form fields
        } else {
            alert("Failed to submit application. Please try again.");
        }
    })
    .catch(error => console.error('Error submitting application:', error));

    
});