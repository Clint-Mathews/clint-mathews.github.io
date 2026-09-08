export interface BootLine {
  label: string;
  status?: string;
  dim?: boolean;
}

export const BOOT_HEAD = "CLINT_OS v1.0.0 -- booting...";

export const BOOT_LINES: BootLine[] = [
  { label: "Loading go_runtime.pkg", status: "OK" },
  { label: "Loading python_dsp.pkg", status: "OK" },
  { label: "Loading kafka_fleet.pkg", status: "OK" },
  { label: "Loading ocpp_gateway.pkg", status: "OK" },
  { label: "Loading nest_services.pkg", status: "OK" },
  { label: "Mounting /projects/photonicops", status: "LIVE" },
  { label: "Mounting /projects/echogate", status: "LIVE" },
  { label: "Mounting /projects/fencelock", status: "LIVE" },
  { label: "Mounting /projects/kafka.consumer", status: "LIVE" },
  { label: "Mounting /projects/ocpp.gw", status: "LIVE" },
  { label: "Checking open_to_work status", status: "TRUE" },
];

export const BOOT_STORAGE_KEY = "clint_os_booted";
