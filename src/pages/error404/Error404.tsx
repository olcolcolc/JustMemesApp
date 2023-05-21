import error404img from '../../assets/error404img.svg';

export default function Error404() {
    return (
        <div className='error404'>
            <img src={error404img} style={{ display: 'block', margin: '0 auto' }} />
        </div>
    );
}
