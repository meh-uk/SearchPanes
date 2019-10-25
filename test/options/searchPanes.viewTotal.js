describe('searchPanes - options - searchPanes.viewTotal', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select', 'searchpanes'],
		css: ['datatables', 'select', 'searchpanes']
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Check defaults (false)', function() {
			table = $('#example').DataTable({
				dom: 'Pfrtip'
			});

			$('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(0)').click();
			expect($('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(1)').text()).toBe('2');
		});

		dt.html('basic');
		it('Check false', function() {
			table = $('#example').DataTable({
				dom: 'Pfrtip',
				searchPanes: {
					viewTotal: false
				}
			});

			$('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(0)').click();
			expect($('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(1)').text()).toBe('2');
		});

		dt.html('basic');
		it('Not shown if hideCount set', function() {
			table = $('#example').DataTable({
				dom: 'Pfrtip',
				searchPanes: {
					viewTotal: true,
					hideCount: true
				}
			});

			$('div.dtsp-searchPane table tbody tr:eq(0) td').click();
			expect($('td.dtsp-countColumn').length).toBe(0);
		});

		dt.html('basic');
		it('Check true when clicking in pane', function() {
			table = $('#example').DataTable({
				dom: 'Pfrtip',
				searchPanes: {
					viewTotal: true
				}
			});

			$('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(0)').click();
			expect($('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(1)').text()).toBe('2 (2)');
		});
		// DD-1199 - disabling these tests until issues resolved
		// it('... and remove when deselected', async function() {
		// 	$('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(0)').click();
		// 	await dt.sleep(100);
		// 	expect($('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(1)').text()).toBe('2');
		// });
		// it('... and not shown when table searched before draw', async function() {
		// 	table.search('Ashton');
		// 	expect($('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(1)').text()).toBe('2');
		// });
		// it('... and shown when table searched after draw', async function() {
		// 	table.draw();
		// 	expect($('div.dtsp-searchPane:eq(1) table tbody tr:eq(0) td:eq(1)').text()).toBe('0 (2)');
		// });
	});
});
