// コードブロックのコピー機能
document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 対応するコードブロックを取得
            const codeBlock = button.previousElementSibling;
            const code = codeBlock.textContent;

            // クリップボードにコピー
            navigator.clipboard.writeText(code)
                .then(() => {
                    // コピー成功時の処理
                    const originalText = button.textContent;
                    button.textContent = 'コピーしました！';
                    button.classList.add('copied');

                    // 2秒後に元のテキストに戻す
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('コピーに失敗しました:', err);
                    button.textContent = 'コピー失敗';
                });
        });
    });

    // 画像の遅延ロード
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
});