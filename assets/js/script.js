const myHeaders = new Headers();

 

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