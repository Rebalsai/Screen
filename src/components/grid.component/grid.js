
import React from 'react';
import { toDataSourceRequestString, translateDataSourceResultGroups } from '@progress/kendo-data-query';
import moment from 'moment';
const filterOperators = {
    'text': [
        { text: 'grid.filterContainsOperator', operator: 'contains' },
        { text: 'grid.filterNotContainsOperator', operator: 'doesnotcontain' },
        { text: 'grid.filterEqOperator', operator: 'eq' },
        { text: 'grid.filterNotEqOperator', operator: 'neq' },
        { text: 'grid.filterStartsWithOperator', operator: 'startswith' },
        { text: 'grid.filterEndsWithOperator', operator: 'endswith' },
        { text: 'grid.filterIsEmptyOperator', operator: 'isempty' },
        { text: 'grid.filterIsNotEmptyOperator', operator: 'isnotempty' }
    ],
    'numeric': [
        { text: 'grid.filterEqOperator', operator: 'eq' },
        { text: 'grid.filterNotEqOperator', operator: 'neq' },
        { text: 'grid.filterGteOperator', operator: 'gte' },
        { text: 'grid.filterGtOperator', operator: 'gt' },
        { text: 'grid.filterLteOperator', operator: 'lte' },
        { text: 'grid.filterLtOperator', operator: 'lt' },
        { text: 'grid.filterIsNullOperator', operator: 'isnull' },
        { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' }
    ],
    'date': [
        { text: 'grid.filterAfterOrEqualOperator', operator: 'gte' },
        { text: 'grid.filterAfterOperator', operator: 'gt' },
        { text: 'grid.filterBeforeOperator', operator: 'lt' },
        { text: 'grid.filterBeforeOrEqualOperator', operator: 'lte' }
    ],
    'datetime': [
        { text: 'grid.filterEqOperator', operator: 'eq' },
        { text: 'grid.filterNotEqOperator', operator: 'neq' },
        { text: 'grid.filterAfterOrEqualOperator', operator: 'gte' },
        { text: 'grid.filterAfterOperator', operator: 'gt' },
        { text: 'grid.filterBeforeOperator', operator: 'lt' },
        { text: 'grid.filterBeforeOrEqualOperator', operator: 'lte' }
    ],
    'boolean': [
        { text: 'grid.filterEqOperator', operator: 'eq' }
    ]
}
export function withState(WrappedGrid) {
    return class StatefullGrid extends React.Component {
        constructor(props) {
            super(props);
            this.state = { dataState: { skip: 0, take: 10 }, additionalParams: null, data: [], isLoading: false };

        }
        refreshGrid() {
            this.fetchData(this.state.dataState);
        }
        loadingPanel = (
            <div className="k-loading-mask">
                <span className="k-loading-text">Loading</span>
                <div className="k-loading-image"></div>
                <div className="k-loading-color"></div>
            </div>
        );
        render() {
            return (
                <div style={{ position: 'relative' }}>
                    {this.state.isLoading && this.loadingPanel}
                    <WrappedGrid
                        sortable={true}
                        resizable={true}
                        filterOperators={filterOperators}
                        pageable={{ pageSizes: [5, 10, 20, 30, 40, 50, "All"] }}
                        {...this.props}
                        total={this.state.total}
                        data={this.state.data}
                        skip={this.state.dataState.skip}
                        pageSize={this.state.dataState.take}
                        filter={this.state.dataState.filter}
                        sort={this.state.dataState.sort}
                        onDataStateChange={this.handleDataStateChange}
                    />
                </div>
            );
        }

        componentDidMount() {
            this.fetchData(this.state.dataState);
        }

        handleDataStateChange = (changeEvent) => {
            let _dataState = changeEvent.dataState;
            if (isNaN(_dataState.take)) {
                _dataState.take = this.state.total
            }
            this.setState({ dataState: _dataState });
            this.fetchData(_dataState);
        }

        fetchData(dataState) {
            if (dataState.filter) {
                dataState.filter.filters?.map((item) => {
                    item.filters?.map((value) => {
                        if (value.operator === "gte" || value.operator === "gt" || value.operator === "lte" || value.operator === "lt") {
                            value.value = value.value ? ((value.operator == 'lte' || value.operator == "gt") ? new Date(moment(value.value).format('YYYY-MM-DDT23:59:59')) : new Date(moment(value.value).format('YYYY-MM-DDT00:00:00'))) : null;
                        }
                    })
                })
            }
            this.setState({ ...this.state, isLoading: true })
            setTimeout(() => this.setState({ ...this.state, isLoading: false }), 5000);
            // const { oidc: { user } } = store.getState();
            let queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state.
            const hasGroups = dataState.group && dataState.group.length;
            if (this.props.additionalParams) {
                let _additionalParams = '';
                for (let key in this.props.additionalParams) {
                    _additionalParams = _additionalParams + `/${this.props.additionalParams[key]}`
                }
                queryStr = _additionalParams+'?'+queryStr ;
            }else{
                queryStr ='?'+queryStr
            }
            const base_url = this.props.url;
            const init = { method: 'GET', accept: 'application/json', headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InhueHNWejMtbjJrOFFLRkFjUXlLc2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2NTgxMzU2NzcsImV4cCI6MTY1ODczNTY3NywiaXNzIjoibnVsbCIsImNsaWVudF9pZCI6InN1aXNzZWJhc2UiLCJzdWIiOiIyZTkwZTIxZi1kMzVjLTQxNDMtODVlZi1jZTIxZTkwYzM2YTMiLCJhdXRoX3RpbWUiOjE2NTgxMzUyMDksImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsInVuaXF1ZV9uYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsImVtYWlsIjoiamFtYWxAeW9wbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiKzkxIDc3NTIwMDk0ODIiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiXSwiYW1yIjpbInB3ZCJdfQ.Ejtac_bs_X93urnn_an2iO-E4HmPO-I-5kxWkXuUq--WJsbQxkQ35Z6ofYLdq0C02ywXcdCb9I9Km4WHFDWxP7g3skil54Opctqt32RKWsskhe0_m0I-ymUYTtCxXeBWBLrqKShH_B79zE5QV_uiR0PTNRG4lXR8hHACp4Wihr_GFQjVmUCofQg_yGSl2qc8NWkuEVYwuOuyp52Zhl52RolOl-HJs8sIG3ZwEoiktGXPC17ur2Ue1kxCtrs25K_J3Z9dnskjelWDQO0BKZ54Go-ft_2PlsaXQLX4xkMt86ehyVYjPN5-zZewT-MaH8UbKgEAar-9EBM6oXUcxlmFHQ`, AuthInformation: '5eab9606d1ee3b8ade84e36f46491e12eb2751c61c04cec6468502bc05678e6emFKPomxlBw1T6pc3Jdcs5Xqq0VSEBsXYdMIAg2oUBrLHIJxz0gmPIH0oqT4Ebb6KkYOk1nctI5HPwSCLOClKJ0djbKPLGohfW36OTs9FtD3G329sF0KdbHdrjCGusqSZ'} };

            fetch(`${base_url}${queryStr}`, init)
                .then(response => response.json())
                .then(({ data, total }) => {
                    this.setState({
                        data: hasGroups ? translateDataSourceResultGroups(data) : data,
                        total,
                        dataState,
                        isLoading: false
                    });
                });
        }
    }
}