import { ISST } from './paneType';
import SearchPaneST from './SearchPaneST';

let $;
let dataTable;

export function setJQuery(jq) {
	$ = jq;
	dataTable = jq.fn.dataTable;
}

export default class SearchPaneViewTotal extends SearchPaneST {

	public s: ISST;

	public constructor(paneSettings, opts, index, panesContainer, panes) {
		let override = {
			i18n: {
				countFiltered:'{shown} ({total})'
			}
		};
		super(paneSettings, $.extend(override, opts), index, panesContainer, panes);
	}

	/**
	 * Overrides the blank method in SearchPane to return the number of times a given value is currently being displayed
	 *
	 * @param filter The filter value
	 * @returns number - The number of times the value is shown
	 */
	protected _getShown(filter) {
		return this.s.rowData.binsShown && this.s.rowData.binsShown[filter] ?
			this.s.rowData.binsShown[filter] :
			0;
	}

	/**
	 * Overrides the method from SearchPane to make it take no action
	 *
	 * @returns undefined
	 */
	protected _getEmpties(): number {
		return undefined;
	}

	/**
	 * Gets the message that is to be used to indicate the count for each SearchPane row
	 *
	 * This method overrides _getMessage() in SearchPane and is overridden by SearchPaneCascadeViewTotal
	 *
	 * @param row The row object that is being processed
	 * @returns string - the message that is to be shown for the count of each entry
	 */
	protected _getMessage(row: any) {
		let countMessage = this.s.dt.i18n('searchPanes.count', this.c.i18n.count);
		let filteredMessage = this.s.dt.i18n('searchPanes.countFiltered', this.c.i18n.countFiltered);
		return (this.s.filteringActive ? filteredMessage : countMessage)
			.replace(/{total}/g, row.total)
			.replace(/{shown}/g, row.shown);
	}
}
