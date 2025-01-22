document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('query-form');
    const resultSection = document.getElementById('result');
    const reportContent = document.getElementById('report-content');

    // 保存表單狀態
    function saveFormState() {
        const formData = {
            calendarType: document.querySelector('input[name="calendarType"]:checked').value,
            birthdate: document.getElementById('birthdate').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value,
            question: document.getElementById('question').value,
            timePeriod: document.getElementById('time-period').value
        };
        sessionStorage.setItem('formData', JSON.stringify(formData));
    }

    // 恢復表單狀態
    function restoreFormState() {
        const formData = JSON.parse(sessionStorage.getItem('formData') || '{}');
        if (formData.calendarType) {
            document.querySelector(`input[name="calendarType"][value="${formData.calendarType}"]`).checked = true;
        }
        if (formData.birthdate) {
            document.getElementById('birthdate').value = formData.birthdate;
        }
        if (formData.country) {
            document.getElementById('country').value = formData.country;
        }
        if (formData.city) {
            document.getElementById('city').value = formData.city;
        }
        if (formData.question) {
            document.getElementById('question').value = formData.question;
        }
        if (formData.timePeriod) {
            document.getElementById('time-period').value = formData.timePeriod;
        }
    }

    // 日期選擇器邏輯
    const birthYear = document.getElementById('birth-year');
    const birthMonth = document.getElementById('birth-month');
    const birthDay = document.getElementById('birth-day');
    const birthdate = document.getElementById('birthdate');

    // 更新日期選項
    function updateDays() {
        const year = parseInt(birthYear.value);
        const month = parseInt(birthMonth.value);
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // 清空現有選項
        birthDay.innerHTML = '<option value="">日</option>';
        
        // 添加新的日期選項
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            birthDay.appendChild(option);
        }
    }

    // 更新隱藏的日期值
    function updateBirthdate() {
        const year = birthYear.value;
        const month = birthMonth.value.padStart(2, '0');
        const day = birthDay.value.padStart(2, '0');
        
        if (year && month && day) {
            birthdate.value = `${year}-${month}-${day}`;
        }
    }

    // 監聽日期選擇器變化
    birthYear.addEventListener('change', () => {
        if (birthMonth.value) updateDays();
        updateBirthdate();
    });

    birthMonth.addEventListener('change', () => {
        updateDays();
        updateBirthdate();
    });

    birthDay.addEventListener('change', updateBirthdate);

    // 初始化時恢復表單狀態
    restoreFormState();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 保存當前表單狀態
        saveFormState();
        
        const calendarType = document.querySelector('input[name="calendarType"]:checked').value;
        const birthdate = document.getElementById('birthdate').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const question = document.getElementById('question').value;
        const timePeriod = document.getElementById('time-period').value;

        // 顯示載入狀態
        reportContent.innerHTML = '<p>分析中，請稍候...</p>';
        resultSection.classList.remove('hidden');

        try {
            const response = await fetch('/api/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    calendarType: calendarType,
                    birthdate: birthdate,
                    country: country,
                    city: city,
                    question: question,
                    timePeriod: timePeriod
                })
            });

            if (!response.ok) {
                throw new Error('網路請求失敗');
            }

            const data = await response.json();
            displayReport(data);
        } catch (error) {
            reportContent.innerHTML = `<p class="error">發生錯誤：${error.message}</p>`;
        }
    });

    function displayReport(data) {
        const reportHtml = `
            <div class="report-section">
                <h3>星座分析</h3>
                <p>${data.星座分析}</p>
            </div>
            <div class="report-section">
                <h3>紫微斗數</h3>
                <p>${data.紫微斗數}</p>
            </div>
            <div class="report-section">
                <h3>八字分析</h3>
                <p>${data.八字分析}</p>
            </div>
            <div class="report-section">
                <h3>易經卦象</h3>
                <p>${data.易經卦象}</p>
            </div>
            <div class="report-section">
                <h3>綜合建議</h3>
                <p>${data.綜合建議.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        reportContent.innerHTML = reportHtml;
    }
});
