import { useController } from "react-hook-form";

export default function FormInput(props) {
    const { field, fieldState } = useController(props);
  
    return (
      <div>
        <input {...field} placeholder={props.placeholder} />
        <p>{fieldState.error?.message}</p>
      </div>
    );
  }
  