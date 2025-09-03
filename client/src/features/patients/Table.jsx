import { useCallback } from "react";
import { formatDate, patientsTableColumns } from "@/utils/constant";
import TableBody from "@/component/TableBody";
import { RiMailFill, RiPhoneFill } from "@remixicon/react";

export default function Table({ patients }) {
  const renderCell = useCallback((patient, columnKey) => {
    const cellValue = patient[columnKey];
    switch (columnKey) {
      case "fullname":
        return (
          <>
            <h1 className="font-bold">{patient?.fullname}</h1>
            {patient?.email}
          </>
        );
      case "gender":
        return <div className="capitalize">{patient?.gender}</div>;
      case "dateOfBirth":
        return (
          <div className="capitalize">{formatDate(patient?.dateOfBirth)}</div>
        );
      case "action":
        return (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => window.open(`mailto:${patient.email}`, "_blank")}
              title="send a mail"
              className="cursor pointer"
            >
              <RiMailFill className="text-blue-500" />
            </button>
            <button
              onClick={() =>
                window.open(`tel:${patient.phoneNumber}`, "_blank")
              }
              title={`call ${patient?.fullname}`}
              className="cursor pointer"
            >
              <RiPhoneFill className="text-blue-500" />
            </button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <TableBody
        tableColumns={patientsTableColumns}
        tableData={patients}
        renderCell={renderCell}
      />
    </>
  );
}
