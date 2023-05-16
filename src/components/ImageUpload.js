const ImageUpload = ({ onImageSelected, register, errors }) => {

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            onImageSelected(file)
        }
    }

    const imageValidation = (value) => {
        if (!value || !value[0]) {
            return '* Please select an image file';
        }
        if (value[0]?.type.includes('image/')) {
            const fileSizeInBytes = value[0]?.size;
            const maxSizeInBytes = 3145728;
            if (fileSizeInBytes <= maxSizeInBytes) {
                return true;
            } else {
                return 'File size exceeds the allowed limit of 3MB';
            }
        }
        return 'Invalid file format. Only JPG, JPEG, and PNG are allowed';
    };

    return (
        <>
            <fieldset>
                <input
                    className={`form-control ${errors?.image_path ? 'is-invalid' : ''}`}
                    type="file"
                    name="image_path"
                    onChange={handleFileSelect ?? ''}
                    {...register('image_path', {
                        validate: imageValidation
                    })}
                />
                {errors?.image_path &&
                    <div className='invalid-feedback'>
                        {errors.image_path.message}
                    </div>
                }
            </fieldset>
        </>
    );
};

export default ImageUpload;