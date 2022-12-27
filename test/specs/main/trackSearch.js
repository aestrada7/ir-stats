describe('Track Search', () => {
    it('should show a dropdown with options', async () => {
        await browser.url(`http://127.0.0.1:3000`);

        await $('.track-search .autocomplete-input').setValue('home');

        await expect($('.autocomplete-list-container')).toBeExisting();
    });

    it('should contain correct options', async () => {
        await expect($('.autocomplete-list-container .autocomplete-item:nth-child(1)')).toHaveText('Homestead Miami Speedway');
        await expect($('.autocomplete-list-container .autocomplete-item:nth-child(2)')).toHaveText('Homestead Miami Speedway (Indycar Oval)');
    });

    it('should allow user to navigate with the down and up arrows', async () => {
        await browser.keys(['ArrowDown']);
        await browser.keys(['ArrowUp']);
        await browser.keys(['ArrowDown']);

        await expect($('.autocomplete-list-container .autocomplete-item:nth-child(1)')).toHaveElementClass('focused');
    });
});