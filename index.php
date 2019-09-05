<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="js/Tocca.min.js"></script>

    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="slider">
        <div class="slider__slide-box">
            <div class="slider__slide-container">
                <?php
                for ($i = 0; $i < 5; $i++) {
                    ?>
                    <div class="slider__slide">
                        <div class="slider__slide__container">
                            <div class="slider__slide__half --rgt">
                                <div class="slider__slide__titulo">
                                    Titulo <?=$i?>
                                </div>
                                <div class="slider__slide__descripcion">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                </div>
                            </div>
                            <div class="slider__slide__half --lft">
                                <div class="slider__slide__imagen">
                                    <img alt="Slide <?=$i?>" src="https://via.placeholder.com/450x600/fff/000?text=Slide <?=$i?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>
        </div>
    </div>
</body>
<script src="js/slider.js"></script>
</html>