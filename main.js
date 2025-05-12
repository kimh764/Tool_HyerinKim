
const aboutBtn = document.getElementById('aboutBtn');
const modal = document.getElementById('aboutModal');
const closeBtn = document.getElementById('closeModal');
const consonantList = document.getElementById('consonantList');
const vowelList = document.getElementById('vowelList');
const symbolDisplay = document.getElementById('symbolDisplay');
const numberList = document.querySelector('ul.custom-checkbox.grid');

aboutBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

let selectedColor = 'transparent';
let selectedSymbol = null;

// 40가지 이상의 색상 팔레트 배열
const colors = [
 '#FFFFFF','#F3C44F','#DD3585','#986AA8','#60A1CE'
];
document.querySelectorAll('.color-picker').forEach(picker => {
  picker.addEventListener('input', () => {
    selectedColor = picker.value;
    document.querySelectorAll('.color-option').forEach(b => b.classList.remove('ring-2'));
  });
});
const resetBtn = document.getElementById('gridResetBtn');
resetBtn.addEventListener('click', () => {
  rowsInput.value = 10;
  colsInput.value = 10;
  createGuides(10, 10); // 기본 그리드로 리셋
});
// 배경색 팔레트 생성
const paletteContainer = document.getElementById('colorPalette');
paletteContainer.innerHTML = '';
colors.forEach(color => {
  const btn = document.createElement('button');
  btn.className = 'color-option w-6 h-6 border border-black';
  btn.style.backgroundColor = color;
  btn.addEventListener('click', () => {
    selectedColor = color;
    document.querySelectorAll('.color-option').forEach(b => b.classList.remove('ring-2'));
    btn.classList.add('ring-2');
  });
  paletteContainer.appendChild(btn);
});
// 가이드 그리드 생성 (40칸 이상)
function createGuides(rows = 8, cols = 8) {
  symbolDisplay.innerHTML = ''; // 초기화
  symbolDisplay.style.display = 'grid';
  symbolDisplay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  symbolDisplay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  symbolDisplay.style.gap = '2px';

  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.style.width = '100%';
    cell.style.height = '100%';
    cell.style.position = 'relative';
    cell.style.backgroundColor = 'white';
    cell.style.border = '1px solid #ccc';
    cell.addEventListener('click', () => {
      if (selectedSymbol) {
        const img = document.createElement('img');
        img.src = selectedSymbol;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        cell.innerHTML = '';
        cell.appendChild(img);
      } else {
        cell.innerHTML = '';
      }
      cell.style.backgroundColor = selectedColor;
    });
    symbolDisplay.appendChild(cell);
  }
}

// 심볼 선택
function setupSymbolSelector() {
  document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        selectedSymbol = e.target.dataset.img;
        document.querySelectorAll('input[type="checkbox"]').forEach(i => {
          if (i !== e.target) i.checked = false;
        });
      } else {
        selectedSymbol = null;
      }
    });
  });
}




// PDF 버튼
const pdfBtn = document.querySelector('button.bg-black');
pdfBtn.addEventListener('click', () => {
  const element = document.getElementById('symbolDisplay');

  html2canvas(element, {
    scale: 2, // 더 선명하게
    useCORS: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;

    // DOM 크기를 기준으로 PDF 사이즈 설정
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    const pdf = new jsPDF({
      orientation: elementWidth > elementHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [elementWidth, elementHeight]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, elementWidth, elementHeight);
    pdf.save('hangul-tool.pdf');
  });
});


// 초기화
createGuides(8, 8);
setupSymbolSelector();

//가이드

const rowsInput = document.getElementById('rowsInput');
const colsInput = document.getElementById('colsInput');
const gridApplyBtn = document.getElementById('gridApplyBtn');

gridApplyBtn.addEventListener('click', () => {
  const rows = parseInt(rowsInput.value) || 40;
  const cols = parseInt(colsInput.value) || 28;
  createGuides(rows, cols);
});



