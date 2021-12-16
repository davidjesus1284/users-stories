-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-12-2021 a las 17:51:27
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `users_stories`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order`
--

CREATE TABLE `order` (
  `orderId` int(11) NOT NULL,
  `direction` varchar(255) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `status` enum('Pending','Delivered') NOT NULL DEFAULT 'Pending',
  `shoppingCartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order`
--

INSERT INTO `order` (`orderId`, `direction`, `paymentId`, `status`, `shoppingCartId`, `userId`, `state`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Av alameda horizontes', 4, 'Pending', 4, 1, 1, '2021-12-12 04:30:21', '2021-12-12 04:30:21', NULL),
(2, 'Av alameda horizontes', 4, 'Pending', 5, 1, 1, '2021-12-12 14:40:55', '2021-12-12 14:40:55', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment`
--

CREATE TABLE `payment` (
  `paymentId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `payment`
--

INSERT INTO `payment` (`paymentId`, `name`, `state`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Visa', 1, '2021-12-12 03:42:02', '2021-12-12 03:42:02', NULL),
(2, 'Master Card', 1, '2021-12-12 03:42:11', '2021-12-12 03:42:11', NULL),
(3, 'American Express', 1, '2021-12-12 03:42:21', '2021-12-12 03:42:21', NULL),
(4, 'Cash', 1, '2021-12-12 03:42:29', '2021-12-12 03:42:29', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sku` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`productId`, `name`, `sku`, `price`, `quantity`, `state`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Mesa de Computo para trabajar', 3450, 1300, 8, 1, '2021-12-11 02:14:44', '2021-12-12 22:35:06', NULL),
(2, 'Latop Lenovo', 3451, 1800, 6, 1, '2021-12-11 02:15:08', '2021-12-12 14:58:19', NULL),
(3, 'Mouse Genius inalambrico', 3452, 45, 25, 1, '2021-12-11 02:16:09', '2021-12-12 00:25:43', NULL),
(4, 'Mouse Pad', 3453, 100, 18, 1, '2021-12-11 02:16:55', '2021-12-12 14:39:15', NULL),
(5, 'Teclado Genius Inalambrico', 3454, 150, 12, 1, '2021-12-11 02:17:23', '2021-12-12 14:39:15', NULL),
(6, 'Silla Gamer azul', 3455, 1500, 10, 1, '2021-12-11 02:17:50', '2021-12-12 22:35:06', NULL),
(7, 'Silla Gamer Roja', 3456, 1300, 7, 1, '2021-12-11 02:39:40', '2021-12-11 02:39:40', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shoppingcart`
--

CREATE TABLE `shoppingcart` (
  `shoppingCartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `products` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shoppingcart`
--

INSERT INTO `shoppingcart` (`shoppingCartId`, `userId`, `products`, `state`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, '[]', 1, '2021-12-11 21:13:57', '2021-12-11 21:46:03', NULL),
(2, 1, '[]', 1, '2021-12-11 21:49:54', '2021-12-12 00:25:43', NULL),
(3, 1, '\"No hay disponeble Latop Lenovo en stock\"', 1, '2021-12-11 23:45:08', '2021-12-11 23:45:08', NULL),
(4, 1, '[{\"productId\":1,\"name\":\"Mesa de Computo para trabajar\",\"price\":1300,\"sku\":3450,\"quantity\":1},{\"productId\":6,\"name\":\"Silla Gamer azul\",\"price\":1500,\"sku\":3455,\"quantity\":1}]', 1, '2021-12-12 04:27:50', '2021-12-12 04:27:50', NULL),
(5, 1, '[{\"productId\":4,\"name\":\"Mouse Pad\",\"price\":100,\"sku\":3453,\"quantity\":2},{\"productId\":5,\"name\":\"Teclado Genius Inalambrico\",\"price\":150,\"sku\":3454,\"quantity\":3}]', 0, '2021-12-12 14:39:15', '2021-12-12 14:40:55', NULL),
(6, 1, '[{\"productId\":2,\"name\":\"Latop Lenovo\",\"price\":1800,\"sku\":3451,\"quantity\":4}]', 1, '2021-12-12 14:52:44', '2021-12-12 15:08:23', NULL),
(7, 1, '[{\"productId\":6,\"name\":\"Silla Gamer azul\",\"price\":1500,\"sku\":3455,\"quantity\":1},{\"productId\":1,\"name\":\"Mesa de Computo para trabajar\",\"price\":1300,\"sku\":3450,\"quantity\":1}]', 1, '2021-12-12 22:35:06', '2021-12-12 22:35:06', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `name`, `lastName`, `email`, `username`, `password`, `state`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'David', 'Escalante', 'davidjesus1284@gmail.com', 'descalante1416', '$2b$10$uVUcUxjZVIqKdhSTl3KNjO7jqelTz3XSO0tBGl', 1, '2021-12-10 23:50:00', '2021-12-10 23:50:00', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `paymentId` (`paymentId`),
  ADD KEY `shoppingCartId` (`shoppingCartId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`paymentId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- Indices de la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD PRIMARY KEY (`shoppingCartId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `order`
--
ALTER TABLE `order`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `payment`
--
ALTER TABLE `payment`
  MODIFY `paymentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  MODIFY `shoppingCartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`paymentId`) REFERENCES `payment` (`paymentId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`shoppingCartId`) REFERENCES `shoppingcart` (`shoppingCartId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
