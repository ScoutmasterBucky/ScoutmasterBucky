<script setup lang="ts">
import Parse from 'papaparse';

const emit = defineEmits(['fileRead', 'fileReadError']);

const drop = (event: DragEvent) => {
    const files = event.dataTransfer.files;

    if (!files[0]) {
        alert('No files were dragged to the page. Please try again.');

        return;
    }

    readFile(files[0]);
};

const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onabort = function () {
        alert('Read aborted');
        emit('fileReadError');
    };
    reader.onerror = function () {
        alert('Read error');
        emit('fileReadError');
    };
    reader.onload = function () {
        const data = reader.result
            .replace(/\r/g, '\n')
            .replace(/\n\n+/g, '\n')
            .replace(/$/, '\n')
            .replace(/\n(( *,)+\n)+/g, '\n')
            .replace(/\n+$/, '');
        const parsed = Papa.parse(data, {
            dynamicTyping: true,
            header: true,
        });

        if (parsed.errors.length) {
            alert('Error parsing CSV file');
            console.log(parsed.errors);
            emit('fileReadError');

            return;
        }

        emit('fileRead', parsed.data);
    };
    reader.readAsText(file);
};
</script>

<template>
    <h2>Step 1: Load CSV</h2>

    <div
        class="target"
        @dragenter.stop.prevent=""
        @dragover.stop.prevent=""
        @drop.stop.prevent="drop($event)"
    >
        <div>Upload a CSV file with a list of names to get started.</div>
        <div>
            The CSV file will be scanned for fields that you can use to make
            groupings.
        </div>
    </div>
</template>

<style scoped>
.target {
    display: flex;
    flex-direction: column;
    width: 80%;
    border: 3px dashed #7f7f7f;
    padding: 1em;
    gap: 1em;
    margin: 1em auto;
}
</style>
