import React, { ChangeEvent } from 'react'
import ReactTable, { TableProps, Column, SortingRule, Filter, FilterFunction } from 'react-table'
import classNames from 'classnames'
import {
  get,
  filter,
  isString,
  isFunction,
  lowerCase
} from 'lodash'
import { Callout } from '@Domain/Callouts'
import { DataTablePagination, DataTablePaginationProps } from './DataTablePagination'
import { TextInput } from '@Domain/Inputs'
import { Props } from '@Common/types'
const style = require('./DataTable.scss')

type alignmentOptions = Props.Position.Left | Props.Position.Center | Props.Position.Right

interface DataTableColumn extends Column {
  /** Alignment for the header on the column */
  headerAlignment?: alignmentOptions

  /** Alignment for the content in the column */
  columnAlignment?: alignmentOptions
}

interface DataTableState {
  /** Currently applied search filter */
  searchFilter: string | null
}

interface DataTableProps {
  /** Name for this table */
  tableId?: string

  /** List of all row data */
  data: any[]
  /** Column definitions for the table */
  columns: DataTableColumn[]

  /** Whether the table can be sorted on its columns */
  sortable?: boolean
  /** Default sorting properties */
  defaultSorted?: SortingRule[]
  /** Whether the table should be paginated */
  showPagination?: boolean

  /** Whether we should add a search filter - requires pagination  */
  showSearchFilter?: boolean

  /** Show vertical delineation between columns  */
  showVerticalLines?: boolean

  /** Placeholder replacement for when there is no data  */
  noDataComponent?: JSX.Element

  /**
   * Overrides for react-table props which can be applied to this table.
   * Supports all options from https://www.npmjs.com/package/react-table.
   * Use this if you need to provide any custom alterations to how the table works.
   * */
  reactTableOverrides?: Partial<TableProps>
}

class DataTable extends React.Component<DataTableProps, DataTableState> {
  public static defaultProps: Partial<DataTableProps> = {
    sortable: false,
    showPagination: false,
    showSearchFilter: false,
    showVerticalLines: false,
    defaultSorted: [],
    tableId: 'datatable'
  }

  constructor (props: DataTableProps) {
    super(props)

    this.state = {
      searchFilter: null
    }
  }

  defaultFilterMethod = (
    columnFilter: Filter,
    row: any,
    column: DataTableColumn
  ): boolean => {
    // We filter either by the global state filter or by the individual column filter if it exists
    let { searchFilter } = this.state
    if (columnFilter.value) {
      searchFilter = columnFilter.value
    }

    const needle = lowerCase(searchFilter || '')

    let columnValue = ''

    if (isString(column.accessor)) {
      columnValue = get(row, column.accessor, '')
    }

    if (isFunction(column.accessor)) {
      columnValue = column.accessor(row) || ''
    }

    columnValue = lowerCase(columnValue)

    return columnValue.includes(needle)
  }

  shouldFilterRow = (row: any): boolean => {
    const { searchFilter } = this.state
    const { columns } = this.props

    for (const column of columns) {
      const currentFilter = {
        id: column.id || '',
        value: searchFilter
      }

      const filterMethod: FilterFunction = column.filterMethod || this.defaultFilterMethod

      if (filterMethod(currentFilter, row, column)) {
        return true
      }
    }

    return false
  }

  get filteredData (): any[] {
    const { data, showSearchFilter } = this.props
    const { searchFilter } = this.state

    if (!showSearchFilter || !searchFilter) {
      return data
    }

    return filter(data, this.shouldFilterRow)
  }

  get columns (): DataTableColumn[] {
    const { columns } = this.props

    return columns.map((column) => {
      return {
        filterMethod: this.defaultFilterMethod,
        ...column,
        headerClassName: classNames(this.columnClassName(column.headerAlignment), column.headerClassName),
        className: classNames(this.columnClassName(column.columnAlignment), column.className)
      }
    })
  }

  columnClassName (alignment: alignmentOptions | undefined): string | undefined {
    switch (alignment) {
      case Props.Position.Right:
        return 'content-right'
      case Props.Position.Center:
        return 'content-center'
    }
  }

  updateSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchFilter: event.target.value
    })
  }

  get searchFilterComponent (): JSX.Element | undefined {
    const {
      showSearchFilter,
      tableId
    } = this.props

    if (showSearchFilter) {
      return (
        <span className='search-filter'>
          <label>Search:</label>
          <TextInput
            handleChange={this.updateSearchFilter}
            name={`${tableId}-search-filter`}
          />
        </span>
      )
    }
  }

  noDataComponent = (props: any): JSX.Element => {
    const {
      noDataComponent
    } = this.props

    if (noDataComponent) return noDataComponent

    return (
      <Callout type='no-data' shouldFocus={false} >
        {props.children}
      </Callout>
    )
  }

  paginationComponent = (props: DataTablePaginationProps): JSX.Element => {
    return (
      <DataTablePagination
        key='pagination'
        {...props}
        customComponent={this.searchFilterComponent}
      />
    )
  }

  get defaultReactTableProps (): Partial<TableProps> {
    return {
      resizable: false,
      minRows: 0,
      defaultPageSize: 25,
      pageSizeOptions: [10, 25, 50, 100],
      showPaginationTop: true,
      showPaginationBottom: true,
      NoDataComponent: this.noDataComponent,
      PaginationComponent: this.paginationComponent
    }
  }

  get classNames (): string {
    const {
      tableId,
      showVerticalLines
    } = this.props

    return classNames(
      style.DataTable,
      `data-table-${tableId}`,
      {
        'show-vertical-lines': showVerticalLines
      }
    )
  }

  public render (): JSX.Element {
    const {
      showPagination,
      sortable,
      defaultSorted,
      reactTableOverrides
    } = this.props

    const filteredData = this.filteredData

    return <ReactTable
      {...this.defaultReactTableProps}
      data={filteredData}
      columns={this.columns}
      className={this.classNames}
      showPagination={showPagination}
      showPaginationBottom={filteredData.length > 0}
      showPageSizeOptions={showPagination}
      pageSize={showPagination ? undefined : filteredData.length}
      sortable={sortable}
      defaultSorted={defaultSorted}
      {...reactTableOverrides}
    />
  }
}

export {
  DataTableColumn,
  DataTableState,
  DataTableProps,
  DataTable
}