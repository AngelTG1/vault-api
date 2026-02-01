export type PginaLogProps = {
  timeStamp: Date;
  host: string | null;
  ip: string | null;
  machine: string | null;
  message: string | null;
};

export class PginaLog {
  timeStamp: Date;
  host: string | null;
  ip: string | null;
  machine: string | null;
  message: string | null;

  constructor(props: PginaLogProps) {
    this.timeStamp = props.timeStamp;
    this.host = props.host;
    this.ip = props.ip;
    this.machine = props.machine;
    this.message = props.message;
  }

  toPrimitives() {
    return {
      timeStamp: this.timeStamp,
      host: this.host,
      ip: this.ip,
      machine: this.machine,
      message: this.message,
    };
  }

  static fromRow(row: any) {
    if (!row) return null;
    return new PginaLog({
      timeStamp: row.TimeStamp ? new Date(row.TimeStamp) : new Date(),
      host: row.Host ?? null,
      ip: row.Ip ?? null,
      machine: row.Machine ?? null,
      message: row.Message ?? null,
    });
  }
}
