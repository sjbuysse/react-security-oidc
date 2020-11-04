import React from "react";
import { ActionButtonType, ActionButton } from "../ActionButton/ActionButton";
import { ActionButtonMenu } from "../ActionButtonMenu/ActionButtonMenu";

type ExtendedType = { id: string } & { [key: string]: any };

interface TableRowProps<T> {
  item: T;
  isReadOnly: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function TableRow<T extends ExtendedType>({
  item,
  isReadOnly,
  onEdit,
  onDelete,
}: TableRowProps<T>) {
  return (
    <tr>
      {Object.keys(item).map((key) => (
        <td key={key} className="border px-4 py-2">
          {item[key]}
        </td>
      ))}
      <td className="border px-4 py-2 w-64">
        <ActionButtonMenu disabled={isReadOnly}>
          <ActionButton
            className="mr-4"
            type={ActionButtonType.EDIT}
            label="Edit"
            onClick={() => onEdit(item.id)}
          />
          <ActionButton
            type={ActionButtonType.DELETE}
            label="Delete"
            onClick={() => onDelete(item.id)}
          />
        </ActionButtonMenu>
      </td>
    </tr>
  );
}

interface TableProps<T> {
  headers: string[];
  data: T[] | undefined;
  renderRow?: (item: T) => React.ReactNode;
  isReadOnly?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Table<T extends ExtendedType>({
  headers,
  data,
  renderRow,
  isReadOnly = false,
  onEdit,
  onDelete,
}: TableProps<T>) {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-200">
          {headers.map((header) => (
            <th key={header} className="border px-4 py-2 text-left">
              {header}
            </th>
          ))}
          <th className="border px-4 py-2 text-left"></th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item) =>
            renderRow ? (
              renderRow(item)
            ) : (
              <TableRow
                key={item.id}
                isReadOnly={isReadOnly}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          )
        ) : (
          <tr>
            <td className="border px-4 py-2" colSpan={headers.length + 1}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
