import { ISemantic } from "../../../interface/component/common/smantic_tags"

const Heading5 = ({ children, className }: ISemantic) => {
  return (
    <h5 className={`${className}`}>{children}</h5>
  )
}

export default Heading5