// Used to append child elements to a parent element in the DOM
function append(parent, child) {
  return parent.appendChild(child);
}

function getBackupData() {
  return [
    { name: 'Call of Duty', url: '' },
    { name: 'Battlefield 4', url: '' },
    { name: 'Sons of War', url: '' },
    { name: 'Billy Bo', url: '' },
    { name: 'Super Smash', url: '' },
    { name: 'Sunbeam', url: '' },
    { name: 'Nightmare', url: '' },
    { name: 'Hupatix', url: '' },
    { name: 'Bongbong', url: '' },
    { name: 'Window Smasher', url: '' },
    { name: 'Bella', url: '' },
    { name: 'Life of a Dog', url: '' },
    { name: 'Repairman', url: '' },
    { name: 'Bruteforce', url: '' },
    { name: 'American Football', url: '' },
    { name: 'FIFA 1985', url: '' },
    { name: 'Skully', url: '' },
    { name: 'Forest Run!', url: '' },
    { name: 'Excalibur', url: '' },
    { name: 'Medieval War', url: '' },
    { name: 'Matrix', url: '' },
    { name: 'Lava Maze', url: '' }
  ];
}

function appendLinks(dataSets) {
  // For each link, create a 'a' element in the DOM with the following properties
  dataSets.map(dataSet => {
    let a = document.createElement('a');
    a.target    = '_blank';
    a.href      = dataSet.url; // Game URL here?

    let topbar = document.createElement('span');
    topbar.innerHTML = dataSet.name;

    // Append the child element -> 'a' to the container
    append(linksContainer, a);
    append(a, topbar);
  })
}

// Wait untill the page is loaded, then execute the script
document.addEventListener("DOMContentLoaded", event => {

  // Target the container where the generated links will be placed in
  linksContainer = document.getElementById('linksContainer');

  // Fetch the data from the back-end
  fetch('https://example.url')
  .then(resp => resp.json())
  .then(data => {
    appendLinks(data);
  })
  // If any error occurs, log the error so you can see where the code went wrong
  .catch(err => {
    console.log(JSON.stringify(err));

    // Generate links from the backup plan when the API doesn't give data back
    appendLinks(getBackupData());
  })
});