class Handwriting {
    static staticConstructor({canvasId, goalCanvasId, detectBtnId, clearBtnId, resultId}) {
        this.canvas = document.getElementById(canvasId);
        this.goalCanvas = document.getElementById(goalCanvasId);
        this.detectBtn = document.getElementById(detectBtnId);
        this.clearBtn = document.getElementById(clearBtnId);
        this.result = document.getElementById(resultId);

        this.goalSize = 28;
        this.scaleFactor = 10;
        this.scaleSize = this.goalSize * this.scaleFactor;

        this.canvas.width = this.scaleSize;
        this.canvas.height = this.scaleSize;
        this.context = this.canvas.getContext('2d');
        this.context.lineWidth = '14.0';

        this.goalCanvas.width = this.goalSize;
        this.goalCanvas.height = this.goalSize;
        this.goalContext = this.goalCanvas.getContext('2d');

        this.isMouseDown = false;

        this.detectBtn.addEventListener('click', this.detectOnClick);
        this.clearBtn.addEventListener('click', this.clearOnClick);

        this.canvas.addEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('mousedown', this.onMouseDown);
        this.canvas.addEventListener('mouseup', this.onMouseUp);

        this.inputData = [];
    }
    static onMouseMove(event) {
        if (Handwriting.isMouseDown) {
            Handwriting.context.lineTo(event.layerX, event.layerY);
            Handwriting.context.stroke();
        }
    }

    static onMouseDown(event) {
        Handwriting.isMouseDown = true;
        Handwriting.context.moveTo(event.layerX, event.layerY);
    }
    static onMouseUp(event) {
        Handwriting.isMouseDown = false;
    }

    static getIndex(w, h, wi, hj) {
        let width = w * Handwriting.scaleFactor + wi;
        let height = h * Handwriting.scaleFactor + hj;
        return 4 * (width + height * Handwriting.scaleSize);
    }

    static detectOnClick() {
        let image = Handwriting.context.getImageData(0, 0, Handwriting.scaleSize, Handwriting.scaleSize);
        let goalImage = Handwriting.goalContext.createImageData(Handwriting.goalSize, Handwriting.goalSize);
        Handwriting.inputData = [];

        for (let h = 0; h < Handwriting.goalSize; h++) {
            for (let w = 0; w < Handwriting.goalSize; w++) {
                let a = 0;

                for (let hj = 0; hj < Handwriting.scaleFactor; hj++) {
                    for (let wi = 0; wi < Handwriting.scaleFactor; wi++) {
                        let index = Handwriting.getIndex(w, h, wi, hj);
                        a += image.data[index + 3];
                    }
                }

                a /= (Handwriting.scaleFactor * Handwriting.scaleFactor);

                let index = 4 * (w + h * Handwriting.goalSize);
                goalImage.data[index + 3] = a;
                Handwriting.inputData.push(a / 255);
            }
        }
        Handwriting.goalContext.putImageData(goalImage, 0, 0);

        Handwriting.result.innerText = 'Loading...';
        Service.detectHandwritingAPI({image: Handwriting.inputData})
            .then((resp) => {
                Handwriting.result.innerText = `Result is ${resp}`;
            });
    }

    static clearOnClick() {
        // Handwriting.result.innerText = '';
        // Handwriting.isMouseDown = false;
        // Handwriting.context.clearRect(0, 0, Handwriting.scaleSize, Handwriting.scaleSize);
        // Handwriting.goalContext.clearRect(0, 0, Handwriting.goalContext, Handwriting.goalContext);
        window.location.reload();
    }
}
