let currentCollectionId = null;

function openCollectionModal() {

    collectionModal.style.display = "flex";

    document.body.style.overflow = "hidden";

}


function closeCollectionModal() {

    collectionModal.style.display = "none";

    document.body.style.overflow = "auto";

}

// ===========================
// user card collection
// ============================

function createCollectionCard(collection) {

    const songCount = (collection.songs || []).length;

    return `

        <div class="card collection-card"
             data-id="${collection.id}">

            <div class="play">

                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     width="24"
                     height="24"
                     fill="#000">

                    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"/>

                </svg>

            </div>

            <div class="card_img">

                <img src="/static/img/default_collection.jpeg">

            </div>

            <h2>${collection.name}</h2>

            <p>${songCount} Songs</p>

        </div>

    `;

}

function loadCollectionsFromDB() {
    console.log("Loading from IndexedDB...");

    getAllCollections(function (collections) {

        const container =
            document.getElementById("collections-container");

        container.innerHTML = "";

        let html = "";

        collections.forEach(collection => {

            html += createCollectionCard(collection);

        });

        container.innerHTML = html;

    });

}

function openCollection(id) {

    currentCollectionId = id;

    getAllCollections(function (collections) {

        const collection = collections.find(c => c.id === id);

        if (!collection) {

            console.error("Collection not found.");

            return;

        }

        collectionsSection.style.display = "none";

        collectionDetailsSection.style.display = "block";

        collectionTitle.textContent = collection.name;

        collectionSongCount.textContent =
            `${(collection.songs || []).length} Songs`;

        loadCollectionSongs();

    });

}
