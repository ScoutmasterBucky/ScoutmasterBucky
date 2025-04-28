<script setup lang="ts">
const lorem = [
    'Lorem ipsum odor amet, consectetuer adipiscing elit. Netus varius finibus curabitur, pharetra ornare mi elit morbi mus. Cras aliquam fames massa quis facilisis. Torquent faucibus vulputate vivamus eros dictumst porta viverra. Maecenas parturient fermentum dolor potenti vulputate. Praesent leo congue molestie nostra, malesuada imperdiet egestas. Netus taciti mollis faucibus duis fusce gravida. Diam viverra vivamus duis molestie porta dapibus. Et felis laoreet bibendum curae himenaeos fames inceptos? Blandit penatibus pharetra ipsum massa pretium.',
    'Urna ante hendrerit tempor primis facilisi penatibus ullamcorper arcu tempor. Ornare volutpat fringilla maecenas facilisi arcu orci ipsum laoreet nostra. Sed curabitur varius maecenas dignissim pellentesque sagittis potenti diam. Mauris ut vehicula curae purus; interdum nec natoque suspendisse. Integer dis malesuada purus ac facilisi posuere. Cras per nam litora suspendisse neque neque senectus erat. Sapien taciti class duis nulla proin neque. Habitant luctus ligula aenean vitae sem magna sed. Turpis nascetur ullamcorper massa dapibus vel, aptent cras viverra.',
    'Nunc pharetra class imperdiet massa enim primis. At hendrerit semper primis suscipit litora. Ex ad hac arcu a euismod. Consequat lacus turpis morbi mattis porttitor dis. Nec porta semper magna euismod nam venenatis montes quis mauris. Ad lectus pharetra potenti tellus aliquam tincidunt posuere? Hendrerit pellentesque pretium tristique quis potenti tristique laoreet.',
    'Posuere penatibus dapibus eleifend cubilia consectetur vivamus lacinia ultricies. Sollicitudin justo rhoncus sit curabitur commodo blandit laoreet pharetra. Per amet ornare nulla nullam ex massa. Imperdiet amet quis conubia, a mollis mattis. Leo senectus phasellus non senectus turpis sit proin gravida. Sagittis aptent aliquet dolor sodales; duis consectetur interdum. Lobortis luctus fermentum fermentum rhoncus hendrerit vel rutrum conubia. Enim semper cursus ad in urna non eget sapien. Tempor at facilisis odio quisque fermentum suscipit ex inceptos. Tempus nulla senectus quis nullam vitae duis nibh.',
    'Euismod vivamus nascetur consectetur urna interdum. Dictum conubia maximus sed aliquam vitae. Dui dis euismod class odio cubilia fringilla aliquam non. Venenatis nec et donec natoque a elit. Amet aliquet per eu purus metus, laoreet pulvinar dui. Convallis lacinia aliquet elementum vitae nec rhoncus. Alibero mi eros dolor etiam mi dis neque inceptos? In augue aliquet praesent rutrum habitasse proin phasellus maecenas sollicitudin. Duis magna risus conubia facilisi dapibus efficitur.',
];
</script>

<template>
    <h2>Left</h2>

    <ScaledContent align="left">
        <img src="/images/bucky-with-newspaper.jpg" class="wide" />
    </ScaledContent>

    <p v-for="content of lorem">{{ content }}</p>

    <h2>Center</h2>

    <ScaledContent align="center">
        <OtherAwardBucky award="boardsailing" />
    </ScaledContent>

    <p v-for="content of lorem">{{ content }}</p>

    <h2>Right</h2>

    <ScaledContent align="right"
        ><img
            src="/bucky-waving.jpg"
            alt="Scoutmaster Bucky waving"
            class="wide"
    /></ScaledContent>

    <p v-for="content of lorem">{{ content }}</p>

    <h2>None, one item</h2>

    <ScaledContent>
        <img src="/nova-lab/cub-scouts-nova-patch.webp" class="wide" />
    </ScaledContent>

    <p>{{ lorem[0] }}</p>

    <div class="center">
        <ScaledContent>
            <img src="/nova-lab/cub-scouts-nova-patch.webp" class="wide" />
        </ScaledContent>
    </div>

    <p>{{ lorem[1] }}</p>

    <h2>None, two items</h2>

    <div class="bucky-and-badge">
        <ScaledContent>
            <img
                src="/merit-badges/american-heritage/american-heritage-bucky.jpg"
                alt="Bucky"
                class="wide"
            />
        </ScaledContent>
        <ScaledContent>
            <img
                src="/merit-badges/american-heritage/american-heritage.png"
                alt="Merit Badge"
                class="wide"
            />
        </ScaledContent>
    </div>

    <p>{{ lorem[2] }}</p>

    <div class="center">
        <ScaledContent>
            <img
                src="/merit-badges/american-heritage/american-heritage-bucky.jpg"
                alt="Bucky"
                class="wide"
            />
        </ScaledContent>
        <ScaledContent>
            <img
                src="/merit-badges/american-heritage/american-heritage.png"
                alt="Merit Badge"
                class="wide"
            />
        </ScaledContent>
    </div>

    <p>{{ lorem[1] }}</p>

    <h2>List</h2>

    <MeritBadgeList>
        <MeritBadge badge="american-business" />
        <MeritBadge badge="automotive-maintenance" />
        <MeritBadge badge="communication" />
        <MeritBadge badge="citizenship-in-the-community" />
        <MeritBadge badge="emergency-preparedness" />
        <MeritBadge badge="kayaking" />
        <MeritBadge badge="pottery" />
        <MeritBadge badge="public-speaking" />
        <MeritBadge badge="signs-signals-and-codes" />
        <MeritBadge badge="small-boat-sailing" />
        <MeritBadge badge="wilderness-survival" />
        <MeritBadge badge="reading" badge2="scholarship" />
        <MeritBadge badge="athletics" badge2="sports" />
        <MeritBadge badge="canoeing" badge2="whitewater" />
        <MeritBadge badge="environmental-science" />
        <MeritBadge badge="sustainability" />
    </MeritBadgeList>

    <p>{{ lorem[0] }}</p>
</template>

<style scoped>
.bucky-and-badge {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>
