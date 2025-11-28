import { component, emit, html } from 'fudgel';
import Papa from 'papaparse';

component(
    'group-o-matic-step-1',
    {
        template: html`
            <h2>Step 1: Load CSV</h2>

            <div
                class="target"
                @dragenter.stop.prevent=""
                @dragover.stop.prevent=""
                @drop.stop.prevent="drop($event)"
            >
                <div>
                    Upload a CSV file with a list of names to get started.
                </div>
                <div>
                    The CSV file will be scanned for fields that you can use to
                    make groupings.
                </div>
            </div>
        `,
    },
    class {
        drop(event: DragEvent) {
            const files = event.dataTransfer.files;

            if (!files[0]) {
                alert('No files were dragged to the page. Please try again.');

                return;
            }

            this.readFile(files[0]);
        }

        readFile(file: File) {
            const reader = new FileReader();
            reader.onabort = function () {
                alert('Read aborted');
                emit(this, 'fileReadError');
            };
            reader.onerror = function () {
                alert('Read error');
                emit(this, 'fileReadError');
            };
            reader.onload = function () {
                const data = reader.result
                    .toString()
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
                    emit(this, 'fileReadError');

                    return;
                }

                emit(this, 'fileRead', parsed.data);
            };
            reader.readAsText(file);
        }
    }
);
