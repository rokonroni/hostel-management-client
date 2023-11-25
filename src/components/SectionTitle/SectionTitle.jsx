import PropTypes from "prop-types"
const SectionTitle = ({subTitle, title}) => {
    return (
        <div className="text-center my-8 ">
            <h3 className="text-[#D99904]">{subTitle}</h3>
            <h1 className="text-4xl my-4 w-4/12  mx-auto border-x-0 border-4 uppercase font-semibold py-4">{title}</h1>
        </div>
    );
};
SectionTitle.propTypes = {
    subTitle: PropTypes.string,
    title: PropTypes.string
}

export default SectionTitle;