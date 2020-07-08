import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, ChipField, Filter} from 'react-admin'; 
import {TopToolbar, sanitizeListRestProps} from 'react-admin';
import {GenerateButton} from './GenerateButton'; 
import {GenerateContextForm} from './GenerateContextForm';
import Typography from '@material-ui/core/Typography';

const ListActions = ({
    currentSort,
    className,
    resource,
    filters,
    displayedFilters,
    exporter, // you can hide ExportButton if exporter = (null || false)
    filterValues,
    permanentFilter,
    hasCreate, // you can hide CreateButton if hasCreate = false
    basePath,
    selectedIds,
    onUnselectItems,
    showFilter,
    maxResults,
    total,
    ...rest
}) => {
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
          <GenerateButton resource="users" />
    </TopToolbar>
)};

ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: () => null,
};

const RowDetailPanel = ({ id, record, resource }) => (
  <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

export const UserList = props => {
  return (
    <List {...props} actions={<ListActions />} bulkActionButtons={false} perPage={25} sort={{ field: 'generated_at', order: 'DESC' }} filters={<GenerateContextForm />} title="GRNRY Seeder">
        <Datagrid rowClick="expand" expand={<RowDetailPanel />} >
            <DateField source="generated_at" showTime />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <ChipField source="upload" />
        </Datagrid>
    </List>
)};